import React from 'react';

const SideA = ({ cardStatus, onCardClick, id }) => {
  return (
    <div
      id="front"
      onClick={() => {
        onCardClick(id, cardStatus);
      }}
    >
      <img
        src="https://d92mrp7hetgfk.cloudfront.net/images/sites/misc/21/original.png"
        width="100"
        height="100"
      ></img>
    </div>
  );
};

export default SideA;
