import React from 'react';
import Board from './Board.jsx';
import InfoContainer from './InfoContainer.jsx';
import LeaderBoard from './LeaderBoard';
import Message from './Message';

const Game = (props) => {
  return (
    <div className="Game">
      <InfoContainer state={props.state} />
      <Message state={props.state} />
      <Board state={props.state} onCardClick={props.onCardClick} />
      <LeaderBoard leaderBoard={props.state.leaderBoard} />
    </div>
  );
};

export default Game;
