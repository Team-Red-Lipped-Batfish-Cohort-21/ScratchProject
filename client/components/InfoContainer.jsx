import React from 'react';

const InfoContainer = (props) => {
  return (
    <div className="currentUser">
      <h3>
        <strong>{props.state.user.username} </strong>
      </h3>
      <p id="user-best-record">Best Record: {props.state.user.bestRecord}</p>
      <p id="user-click-count">Click Count: {props.state.clickCount}</p>
    </div>
  );
};

export default InfoContainer;
