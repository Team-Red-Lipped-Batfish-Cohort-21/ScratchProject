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
        {/* <div> */}
        Front<br></br>
        {/* {this.props.cardValue} */}
      </div>
    );
  }
}

export default SideA;
