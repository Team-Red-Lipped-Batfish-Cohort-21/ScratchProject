import React, { Component } from "react";
import { render } from "react-dom";

class InfoContainer extends Component {
  render() {
    console.log(this.props);
    return (
      <div className='currentUser'>
        <h1>Username: {this.props.state.user.username} </h1>
        <h1>Best Record: {this.props.state.user.bestRecord}</h1>
        <h1>Number Of Clicks: {this.props.state.clickCount}</h1>
      </div>
    );
  }
}

export default InfoContainer;
