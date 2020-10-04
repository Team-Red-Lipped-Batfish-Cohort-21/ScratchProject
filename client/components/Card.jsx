import React, { Component } from "react";
import SideA from "./SideA";
import SideB from "./SideB";
import Flippy, { FrontSide, BackSide } from "react-flippy";

const Card = (props) => {
  return (
    <div
      className='card'
      // onClick={(e) => {
      //   // console.log('in card div with e.target', e.target);
      //   // console.log("props", props.cardStatus.flipped);
      //   // invoke the onCardClick function, passing in the props.cardStatus of the card
      //   // console.log("props", props);
      //   if (!props.cardStatus.flipped)
      //     props.onCardClick(props.id, props.cardStatus);
      // }}
    >
      {/* <Flippy flipOnClick={!props.cardStatus.isFlipped}> */}
      <Flippy isFlipped={props.cardStatus.isFlipped}>
        <FrontSide
          id='front'

          // onClick={(e) => {
          //   console.log(e.target);
          // }}
        >
          <SideA />
        </FrontSide>
        <BackSide
          id='back'
          // onClick={(e) => {
          //   console.log(e.target);
          // }}
        >
          <SideB
            cardValue={props.cardValue}
            status={props.cardStatus}
            onCardClick={props.onCardClick}
          />
        </BackSide>
      </Flippy>
    </div>
  );
};

export default Card;
