import React, { Component } from "react";
import { render } from "react-dom";
// import Card from "./Card";
import Card from "./Card-copy";

class Board extends Component {
  render() {
    if (this.props.state.cardCreated) {
      const cardsArray = [];
      for (let i = 0; i < 16; i += 1) {
        cardsArray.push(
          <Card
            id={i}
            key={`Card${i}`}
            cardValue={this.props.state.cardsArray[i].cardValue}
            cardStatus={this.props.state.cardsArray[i]}
            // onClick={(e)=> {this.props.onCardClick(e)}}
            onCardClick={this.props.onCardClick}
          />
        );
      }
      return <div className='board'>{cardsArray}</div>;
      // if (flipped 1 card) increment clickCount  to 1 but keep the first card flipped
      // if flipped 2 cards, check if values match,
      // if values match, increment matched by 2 and keep cards flipped
      // if values not match, flip cards back to how it was and reset clickCount to 0
      // check clickCount(if 2, change reinitialize to 0)
      //
    } else {
      return <div className='board'></div>;
    }
  }
}

export default Board;
