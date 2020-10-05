import React, { Component } from "react";
import { render } from "react-dom";

class SideB extends Component {
  render() {
    return (
      <div id='back'>
        <img src={this.props.cardStatus.picture} width='100' height='100'></img>
      </div>
    );
  }
}

export default SideB;
