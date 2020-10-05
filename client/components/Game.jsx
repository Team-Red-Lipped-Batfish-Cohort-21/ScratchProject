import React, { Component } from 'react';
import { render } from 'react-dom';
import Board from './Board.jsx';
import InfoContainer from './InfoContainer.jsx';
import LeaderBoard from './LeaderBoard';
import Message from './Message';
// Board, Info Container

class Game extends Component {
  render() {
    console.log(
      'props.state.leaderBoard in game',
      this.props.state.leaderBoard
    );
    // const names = [
    //   'Will',
    //   'Phill',
    //   'Kyle',
    //   'Sara',
    //   'Keiran',
    //   'Jeho',
    //   'Wayne',
    //   'Midori',
    // ];
    // const prevVal = this.props.state.previousCard.cardValue;
    // const curVal = this.props.state.currentCard.cardValue;
    // const firstPick = prevVal > -1 ? names[prevVal] : undefined;
    // const secondPick = curVal > -1 ? names[curVal] : undefined;
    // const found = firstPick === secondPick ? firstPick : undefined;
    return (
      <div className="Game">
        <InfoContainer state={this.props.state} />
        {/* <div className="special-messages">
          <div>{firstPick}</div>
          <div>{secondPick}</div>
        </div> */}
        <Message state={this.props.state} />
        <Board state={this.props.state} onCardClick={this.props.onCardClick} />
        <LeaderBoard leaderBoard={this.props.state.leaderBoard} />
      </div>
    );
  }
}

export default Game;
