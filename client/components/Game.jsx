import React, { Component } from "react";
import { render } from "react-dom";
import Board from "./Board.jsx";
import InfoContainer from "./InfoContainer.jsx";
import LeaderBoard from "./LeaderBoard";
// Board, Info Container

class Game extends Component {
  render() {
    console.log(
      "props.state.leaderBoard in game",
      this.props.state.leaderBoard
    );
    return (
      <div className='Game'>
        <InfoContainer state={this.props.state} />
        <Board state={this.props.state} onCardClick={this.props.onCardClick} />
        <LeaderBoard leaderBoard={this.props.state.leaderBoard} />
      </div>
    );
  }
}

export default Game;
