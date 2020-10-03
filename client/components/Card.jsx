import React, { Component } from "react";
import SideA from "./SideA";
import SideB from "./SideB";
import Flippy, { FrontSide, BackSide } from "react-flippy";

const Card = (props) => {
  return (
    <div className='card'>
      <Flippy>
        <FrontSide style={{ backgroundColor: "#41669d" }}>
          <SideA />
        </FrontSide>
        <BackSide style={{ backgroundColor: "#175852" }}>
          <SideB
            value={props.value}
            status={props.cardStatus}
            // onClick={(e) => {
            //   console.log("onClick on SideB");
            //   props.onCardClick(e);
            // }}
            // onClick={props.onCardClick}
            onClick={() => {
              console.log("side b clicked!");
            }}
          />
        </BackSide>
      </Flippy>
    </div>
  );
};

export default Card;
