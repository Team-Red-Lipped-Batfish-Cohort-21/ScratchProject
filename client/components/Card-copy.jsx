import React, { Component, useState } from "react";
import SideA from "./SideA";
import SideB from "./SideB";
// import Flippy, { FrontSide, BackSide } from "react-flippy";

const Card = (props) => {
  const sideDiv = !props.cardStatus.flipped ? (
    <SideA
      className='front'
      onCardClick={props.onCardClick}
      cardStatus={props.cardStatus}
      id={props.id}
      // onClick={() => {
      //   console.log("isFlipped?", props.cardStatus.flipped);
      //   props.onCardClick(props.id, props.cardStatus);
      // }}
    />
  ) : (
    <SideB
      id='back'
      className='back'
      cardValue={props.cardValue}
      cardStatus={props.cardStatus}
    />
  );

  return <div className='card'>{sideDiv}</div>;
};

export default Card;
