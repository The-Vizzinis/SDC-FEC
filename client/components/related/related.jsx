import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import config from '../../../config';

// TO-DOS:
// get the productID of the current page from alex's overview component where he stores the id?
// import the ratings star function from sheeba
// make comparison modal inside single product card

// need to get this somehow from alex's component.
// or if he sets 20111 as his default, then we can just always start with this;
const productOverviewId = 20111;

//  //  //  //  //  //  //  //  //  //  //  //
// RELATED PRODUCT CARD STYLED COMPONENTS  //
//  //  //  //  //  //  //  //  //  //  ////

const RelatedCardWrapper = styled.li`
  font-family: 'Roboto', sans-serif;
  display: inline-block;
  width: 200px;
  height: 300px;
  background: white;
  margin: auto 10px;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  position: relative;
  overflow: hidden;
  box-shadow: 0;
  transform: scale(0.95);
  transition: box-shadow 0.5s, transform 0.5s;
  &:hover{
    transform: scale(1);
    box-shadow: 5px 20px 30px rgba(0,0,0,0.2);
  }
`;

const RelatedImage = styled.img`
  height: 67%;
  width: 100%;
  background: no-repeat center center;
  object-fit: cover;
`;

const RelatedIcon = styled.i`
  color: white;
  position: absolute;
  right: 10px;
  top: 10px;
  opacity: 1;
  &:hover{
    color: gold;
  }
`;

const RelatedOverview = styled.section`
  padding: 0px 10px;
`;

const RelatedCategory = styled.h3`
  font-weight: 100;
  font-size: 70%;
  color: grey;
  text-transform: uppercase;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
`;

const RelatedName = styled.h3`
  font-weight: 400;
  font-size: 100%;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
`;

const RelatedSalePrice = styled.h3`
  display: inline-block;
  font-weight: 800;
  font-size: 70%;
  color: red;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
`;

const RelatedPrice = styled.h3`
  display: inline;
  font-weight: 100;
  font-size: 70%;
  text-decoration: ${(props) => (props.sale ? 'line-through' : 'none')};
  color: grey;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
`;

//  //  //  //  //  //  //  //  //  //  //  //
// RELATED PRODUCT LIST STYLED COMPONENTS  //
//  //  //  //  //  //  //  //  //  //  ////

const RelatedProductsWrapper = styled.section`
  margin-left: 10px;
  margin-right: 10px;
`;

const RelatedProductsListWrapper = styled.div`
  font-family: 'Roboto', sans-serif;
  display: inline-flex;
  height: 350px;
  width: 85%;
  margin-left: 10px;
  margin-right: 10px;
  background: white;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  scroll-behavior: smooth;
`;

const RelatedProductsList = styled.ul`
  display: inline;
  padding-inline-start: 0;
  position: relative;
`;

const RelatedArrowButton = styled.button`
  font-size: 150%;
  float: ${(props) => (props.left ? 'left' : 'right')};
  margin: auto;
  padding: 0;
  border-style: none;
  height: 287px;
  width: 50px;
  margin-block-start: 1em;
  margin-block-end: 1em;
  cursor: pointer;
`;

//  //  //  //  //  //  //  //  //  //  //  ////
// RELATED PRODUCT CARD FUNCTIONAL COMPONENT  /
//  //  //  //  //  //  //  //  //  //  //  //

//exampleGetStyles.results[0].photos[0].thumbnail_url

function ProductCard(props) {
  const [isSale, useIsSale] = useState([false]);

  const salePrice = () => {
    if (props.styles[0].sale_price) {
      useIsSale([true, props.styles[0].sale_price]);
    }
  };

  useEffect(() => {
    salePrice();
  }, []);

  return (
    <RelatedCardWrapper className="related-card-wrapper">
      <RelatedIcon className="far fa-star" />
      <RelatedImage className="related-image" src={props.styles[0].photos[0].thumbnail_url} alt="Model wearing selected style" />
      <RelatedOverview className="related-overview">
        <RelatedCategory className="related-category">{props.item.category}</RelatedCategory>
        <RelatedName className="related-name">{props.item.name}</RelatedName>
        {!!isSale[0] && (
        <div>
          <RelatedSalePrice className="related-sale-price">
            $
            {props.styles[0].sale_price}
            &nbsp;
            &nbsp;
          </RelatedSalePrice>
          <RelatedPrice sale className="related-price">
            $
            {props.styles[0].original_price}
          </RelatedPrice>
        </div>
        )}
        {!isSale[0] && (
          <RelatedPrice className="related-price">
            $
            {props.styles[0].original_price}
          </RelatedPrice>
        )}
        <div className="related-rating">*****</div>
      </RelatedOverview>
    </RelatedCardWrapper>
  );
}

//  //  //  //  //  //  //  //  //  //  //  ////
// RELATED PRODUCT LIST FUNCTIONAL COMPONENT  /
//  //  //  //  //  //  //  //  //  //  //  //

function RelatedProducts(props) {
  const ref = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  const [endReached, setEndReached] = useState('left');
  const [relatedProductsArray, setRelatedProductsArray] = useState(null);
  const [relatedProductsStylesObj, setRelatedProductStylesObj] = useState(null);

  useEffect(() => {
    setScrollLeft(ref.current.scrollLeft);
    setScrollWidth(ref.current.scrollWidth);
    setClientWidth(ref.current.clientWidth);
  });

  // need to add get related products on component did mount

  const getRelatedProducts = () => {
    const relatedProductObjs = [];
    const relatedProductsStyles = {};

    const options = {
      headers: {
        Authorization: config.TOKEN,
      },
    };

    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/${productOverviewId}/related`, options)
      .then(({ data }) => {
        const promiseArray = [];

        for (let i = 0; i < data.length; i++) {
          promiseArray.push(
            axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/${data[i]}`, options)
              .then(({ data }) => relatedProductObjs.push(data))
              .catch((err) => console.log('error in getting single product obj when getting related products: ', err)),
          );
        }

        Promise.all(promiseArray)
          .then(() => setRelatedProductsArray(relatedProductObjs))
          .catch((err) => console.log('error in resolving promise.all: ', err));
      })
      .catch((err) => console.log('err in getting related products: ', err));

    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/${productOverviewId}/related`, options)
      .then(({ data }) => {
        const promiseArray = [];

        for (let i = 0; i < data.length; i++) {
          promiseArray.push(
            axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/${data[i]}/styles`, options)
              .then(({ data }) => {
                relatedProductsStyles[data.product_id] = data.results;
              })
              .catch((err) => console.log('error in getting single style obj when getting related products: ', err)),
          );
        }

        Promise.all(promiseArray)
          .then(() => setRelatedProductStylesObj(relatedProductsStyles))
          .catch((err) => console.log('error in resolving promise.all: ', err));
      })
      .catch((err) => console.log('err in getting related products styles: ', err));
  };

  useEffect(() => {
    getRelatedProducts();
  }, []);

  const scroll = (scrollOffset) => {
    let currentScrollLeft;

    if (ref.current.scrollLeft + scrollOffset + clientWidth >= scrollWidth && scrollOffset > 0) {
      currentScrollLeft = scrollWidth;
    } else if (ref.current.scrollLeft + scrollOffset <= 0 && scrollOffset < 0) {
      currentScrollLeft = 0;
    } else if (ref.current.scrollLeft === 0 && scrollOffset > 0) {
      if (scrollOffset + clientWidth > scrollWidth) {
        currentScrollLeft = scrollWidth;
      } else {
        currentScrollLeft = scrollOffset + clientWidth;
      }
    } else {
      currentScrollLeft = ref.current.scrollLeft + scrollOffset;
    }

    ref.current.scrollLeft += scrollOffset;
    setScrollLeft(ref.current.scrollLeft);
    setScrollWidth(ref.current.scrollWidth);
    setClientWidth(ref.current.clientWidth);

    const atLeftEnd = (scrollOffset < 0 && currentScrollLeft === 0);
    const atRightEnd = (currentScrollLeft === relatedProductsArray.length * 222) && (scrollOffset > 0);

    if (atLeftEnd) {
      setEndReached('left');
    } else if (atRightEnd) {
      setEndReached('right');
    } else if (clientWidth >= scrollWidth) {
      setEndReached('both');
    } else {
      setEndReached('middle');
    }
  };

  return (
    <RelatedProductsWrapper>
      {endReached !== 'left' && endReached !== 'both'
      && <RelatedArrowButton left className="left" type="button" onClick={() => scroll(-287)}> &#8592; </RelatedArrowButton>}
      <RelatedProductsListWrapper ref={ref}>
        {relatedProductsArray !== null && relatedProductsStylesObj !== null && (
          <RelatedProductsList>
            {relatedProductsArray.map((item) => (
              <ProductCard item={item} key={item.id} styles={relatedProductsStylesObj[item.id]} />
            ))}
          </RelatedProductsList>
        )}
      </RelatedProductsListWrapper>
      {endReached !== 'right' && endReached !== 'both'
      && <RelatedArrowButton className="right" type="button" onClick={() => scroll(287)}> &#8594; </RelatedArrowButton>}
    </RelatedProductsWrapper>
  );
}

// export whole list of related products at the end, update the export
export default RelatedProducts;
