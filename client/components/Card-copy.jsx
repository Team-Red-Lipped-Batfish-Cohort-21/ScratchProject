import React from 'react';
import SideA from './SideA';
import SideB from './SideB';

const Card = (props) => {
  const sideDiv = !props.cardStatus.flipped ? (
    <SideA
      className="front"
      onCardClick={props.onCardClick}
      cardStatus={props.cardStatus}
      id={props.id}
    />
  ) : (
    <SideB
      id="back"
      className="back"
      cardValue={props.cardValue}
      cardStatus={props.cardStatus}
    />
  );

  return <div className="card">{sideDiv}</div>;
};

export default Card;
