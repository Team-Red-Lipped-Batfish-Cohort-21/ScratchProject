import React from 'react';

const SideB = ({ cardStatus }) => {
  return (
    <div id="back">
      <img src={cardStatus.picture} width="100" height="100"></img>
    </div>
  );
};

export default SideB;
