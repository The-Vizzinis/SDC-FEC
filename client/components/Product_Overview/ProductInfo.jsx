import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StarRating from '../Reviews/StarRating';

// **Styling Tempelates**//
const CategoryStyle = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  margin: 7.5px 10px 7.5px 10px;
`;

const NameStyle = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 36px;
  font-weight: bold;
  margin: 7.5px 10px 7.5px 10px;
`;

const PriceStyle = styled.div`
  font-family: 'Roboto', sans-serif;
  color: black;
  text-decoration: none;
  font-size: 16px;
  margin: 7.5px 10px 7.5px 10px;
`;

const LinedPriceStyle = styled.div`
  font-family: 'Roboto', sans-serif;
  color: black;
  text-decoration: line-through;
  font-size: 16px;
  margin: 7.5px 10px 7.5px 10px;
`;

const SalePriceStyle = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  color: red;
  margin: 7.5px 10px 7.5px 10px;
`;

// **Functionality Section** //

const ProductInfo = ({ name, category, price, salesPrice, productOverviewId }) => (
  <div>
    <StarRating productOverviewId={productOverviewId} />
    <CategoryStyle>{category}</CategoryStyle>
    <NameStyle>{name}</NameStyle>
    {!salesPrice
    && (
      <PriceStyle>
        $
        {price}
      </PriceStyle>
    )}
    {salesPrice
    && (
    <div>
      <SalePriceStyle>
        $
        {salesPrice}
        <LinedPriceStyle>
          $
          {price}
        </LinedPriceStyle>
      </SalePriceStyle>
    </div>
    )}
  </div>
);

export default ProductInfo;
