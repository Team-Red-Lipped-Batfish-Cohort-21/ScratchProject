import React, { Component } from "react";
import { render } from "react-dom";
import Board from "./Board.jsx";
import InfoContainer from "./InfoContainer.jsx";
// Board, Info Container

class Game extends Component {
  render() {
    return (
<<<<<<< HEAD
      <div className="Game">
        <InfoContainer state={this.props.state}/>
=======
      <div className='Game'>
        <InfoContainer />
>>>>>>> f8d2efafdc294c7687f54fb048adf82dd8f91f77
        <Board state={this.props.state} onCardClick={this.props.onCardClick} />
      </div>
    );
  }
}

export default Game;
