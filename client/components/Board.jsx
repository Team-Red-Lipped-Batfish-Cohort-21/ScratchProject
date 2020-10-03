import React, { Component } from "react";
import { render } from "react-dom";
import Card from "./Card";

class Board extends Component {
  render() {
    const cards = [];
    for (let i = 0; i < 16; i++) {
      cards.push(<Card id={i} key={`Card${i}`} state={this.props.state} />);
    }

    return <div className='cards'>{cards}</div>;
  }
}

export default Board;
