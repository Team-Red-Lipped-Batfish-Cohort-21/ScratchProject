import React, { Component } from "react";
import { render } from "react-dom";

class SideA extends Component {
  render() {
    // console.log("sideA props", this.props);
    return (
      <div
        id='front'
        onClick={() => {
          console.log("isFlipped?", this.props.cardStatus.flipped);
          this.props.onCardClick(this.props.id, this.props.cardStatus);
        }}
      >
        <img
          src='https://d92mrp7hetgfk.cloudfront.net/images/sites/misc/21/original.png?1567533742'
          width='100'
          height='100'
        ></img>
      </div>
    );
  }
}

export default SideA;
