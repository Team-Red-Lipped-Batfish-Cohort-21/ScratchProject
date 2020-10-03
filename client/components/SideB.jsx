import React, { Component } from "react";
import { render } from "react-dom";

class SideB extends Component {
  render() {
    return (
      <div
        onClick={(e) => {
          console.log("onClick on SideB");
          this.props.onCardClick(e);
        }}
      >
        {this.props.value}
      </div>
    );
  }
}

export default SideB;
