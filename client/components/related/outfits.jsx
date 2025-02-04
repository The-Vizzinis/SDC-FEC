import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import OutfitCard from './outfitcard';
import {
  RelatedProductsWrapper,
  RelatedProductsTitle,
  RelatedProductsListWrapper,
  RelatedProductsList,
  RelatedArrowButton,
} from './related';
import { RelatedCardWrapper } from './relatedcard';

//  //  //  //  //  //  //  //  //  //
// YOUR OUTFITS STYLED COMPONENTS  //
//  //  //  //  //  //  //  //  ////

const OutfitIconWrapper = styled.div`
  height: 67%;
  width: 100%;
  background-color: silver;
`;

const OutfitPlusIcon = styled.i`
  color: white;
  position: absolute;
  display: block;
  left: 43px;
  top: 45px;
  opacity: 1;
  &:hover{
    color: palegoldenrod;
    cursor: pointer;
  }
`;

const OutfitAddText = styled.h3`
  display: block;
  font-size: 90%;
  font-weight: 400;
  margin-top: 2rem;
  text-transform: uppercase;
  color: gray;
  text-align: center;
`;

//  //  //  //  //  //  //  //  //  ////
// YOUR OUTFITS FUNCTIONAL COMPONENTS /
//  //  //  //  //  //  //  //  //  //

const Outfits = ({ productOverviewId, clickTracker }) => {
  const ref = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  const [endReached, setEndReached] = useState('left');
  const [outfitsArray, setOutfitsArray] = useState([]);
  const [outfitsStylesObj, setOutfitsStylesObj] = useState({});
  const [currentProductData, setCurrentProductData] = useState(null);

  useEffect(() => {
    setScrollLeft(ref.current.scrollLeft);
    setScrollWidth(ref.current.scrollWidth);
    setClientWidth(ref.current.clientWidth);
  });

  const getYourOutfits = () => {
    axios.get('/product-features', { params: { id: productOverviewId } })
      .then(({ data }) => { setCurrentProductData(data); })
      .catch((err) => console.log(err));

    const storedOutfits = JSON.parse(localStorage.getItem('outfits'));
    const storedStyles = JSON.parse(localStorage.getItem('styles'));
    if (storedOutfits) {
      setOutfitsArray(storedOutfits);
      setOutfitsStylesObj(storedStyles);
    }
  };

  useEffect(() => {
    getYourOutfits();
  }, []);

  const onAddCardClickHandler = () => {
    axios.get('/product-features', { params: { id: productOverviewId } })
      .then(({ data }) => {
        const newOutfitsArray = outfitsArray;
        const newOutfitsStylesObj = outfitsStylesObj || {};
        let duplicate = false;

        setCurrentProductData(data);

        newOutfitsArray.forEach((outfit) => {
          if (outfit.id === data.id) {
            duplicate = true;
          }
        });

        if (!duplicate) {
          newOutfitsArray.push(data);
          setOutfitsArray(newOutfitsArray);
          setCurrentProductData(data);
        } else {
          alert('This item is already saved in your outfits!');
        }

        axios.get('/outfit-styles', { params: { id: productOverviewId } })
          .then(({ data }) => {
            newOutfitsStylesObj[data.product_id] = data.results;
            setOutfitsStylesObj(newOutfitsStylesObj);

            return {
              outfitInfo: newOutfitsArray,
              outfitStyles: newOutfitsStylesObj,
            };
          })
          .then(({ outfitInfo, outfitStyles }) => {
            localStorage.setItem('outfits', JSON.stringify(outfitInfo));
            localStorage.setItem('styles', JSON.stringify(outfitStyles));
            getYourOutfits();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    clickTracker('add to outfit card', 'Your Outfits');
  };

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
    const atRightEnd = (currentScrollLeft === (outfitsArray.length + 1) * 222) && (scrollOffset > 0);

    if (atLeftEnd) {
      setEndReached('left');
    } else if (atRightEnd) {
      setEndReached('right');
    } else if (clientWidth >= scrollWidth) {
      setEndReached('both');
    } else {
      setEndReached('middle');
    }

    return scrollOffset;
  };

  const handleOutfitDeleteClick = (id) => {
    const storedOutfits = JSON.parse(localStorage.getItem('outfits'));
    const storedStyles = JSON.parse(localStorage.getItem('styles'));

    storedOutfits.forEach((outfit, index) => {
      if (outfit.id === id) {
        storedOutfits.splice(index, 1);
      }
    });

    delete storedStyles[id];

    localStorage.setItem('outfits', JSON.stringify(storedOutfits));
    localStorage.setItem('styles', JSON.stringify(storedStyles));

    setOutfitsArray(storedOutfits);
    setOutfitsStylesObj(storedStyles);
  };

  return (
    <RelatedProductsWrapper>
      <RelatedProductsTitle>YOUR OUTFIT</RelatedProductsTitle>
      <div>
        {endReached !== 'left' && endReached !== 'both'
        && <RelatedArrowButton left className="left" type="button" onClick={() => scroll(-287)}>‹</RelatedArrowButton>}
        <RelatedProductsListWrapper ref={ref}>
          {outfitsArray !== null
          && outfitsStylesObj !== null
          && currentProductData !== null
          // && outfitsStylesObj[productOverviewId]
          && (
            <RelatedProductsList>
              <RelatedCardWrapper onClick={onAddCardClickHandler}>
                <OutfitIconWrapper>
                  <OutfitPlusIcon className="fas fa-plus-circle fa-7x" />
                </OutfitIconWrapper>
                <OutfitAddText>Add To Your Outfits</OutfitAddText>
              </RelatedCardWrapper>
              {outfitsArray.map((item) => (
                <OutfitCard
                  item={item}
                  key={item.id}
                  styles={outfitsStylesObj[item.id]}
                  currentFeatures={currentProductData.features}
                  currentName={currentProductData.name}
                  handleOutfitDeleteClick={handleOutfitDeleteClick}
                  clickTracker={clickTracker}
                />
              ))}
            </RelatedProductsList>
          )}
        </RelatedProductsListWrapper>
        {endReached !== 'right' && endReached !== 'both'
        && <RelatedArrowButton right className="right" type="button" onClick={() => scroll(287)}>›</RelatedArrowButton>}
      </div>
    </RelatedProductsWrapper>
  );
};

export default Outfits;
