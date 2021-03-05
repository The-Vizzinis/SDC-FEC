import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  RelatedCardWrapper,
  RelatedImage,
  RelatedIcon,
  RelatedOverview,
  RelatedCategory,
  RelatedName,
  RelatedSalePrice,
  RelatedPrice,
} from './relatedcard';

const OutfitIcon = styled(RelatedIcon)`
  top: 13px;
`;

//  //  //  //  //  //  //  //  //  //
// OUTFIT CARD FUNCTIONAL COMPONENT  /
//  //  //  //  //  //  //  //  //  //

function OutfitCard(props) {
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
      <OutfitIcon className="fas fa-times-circle fa-lg" onClick={() => props.handleOutfitDeleteClick(props.item.id)} />
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

export default OutfitCard;
