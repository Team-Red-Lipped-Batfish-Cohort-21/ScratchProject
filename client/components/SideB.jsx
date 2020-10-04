import React, { Component } from "react";
import { render } from "react-dom";

class SideB extends Component {
  render() {
    return (
      <div>
        Front<br></br>
        {this.props.cardValue}
      </div>
    );
  }
}

export default SideB;
