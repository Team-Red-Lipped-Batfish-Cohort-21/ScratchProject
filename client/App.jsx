import React, { Component } from 'react';
import { render } from 'react-dom';
import { Switch, Route } from 'react-router-dom';

import Game from './components/Game';
import Login from './components/Login';
import Signup from './components/Signup';

import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardCreated: false,
      user: {}, // username, highscore
      cards: [], // {isFlipped: t/f, value:  , id: }
      clickCount: 0, // if clickCount = 2, then we check the card value, reset clickCount
      matched: 0, // increment when ever the 2 cards values match, game ends when matched = 16
      previousCard: {}, // add in the cardObj from cards
      previousCardID: -1,
    };
    this.logInUser = this.logInUser.bind(this);
    this.signUpUser = this.signUpUser.bind(this);
    this.createCardsArray = this.createCardsArray.bind(this);
    this.shuffleCards = this.shuffleCards.bind(this);
    this.onCardClick = this.onCardClick.bind(this);
  }

  componentDidMount() {
    let cards = this.createCardsArray();
    const cardCreated = true;
    cards = this.shuffleCards(cards);
    // for (let i = 0; i < 16; i += 1) {
    //   console.log(i);
    //   cards[i].idx = i + 1;
    // }
    return this.setState({ ...this.state, cards, cardCreated });
  }

  createCardsArray() {
    const cards = [];
    for (let i = 1; i <= 8; i++) {
      const card = {
        isFlipped: false,
        value: i,
      };
      cards.push(card, card);
    }
    // console.log('cards are', cards);
    return cards;
    // return this.setState({ ...this.state, cards });
  }
  // shuffle cards array

  shuffleCards(cards) {
    cards.sort(() => Math.random() - 0.5);
    // console.log('after one sort', cards);
    cards.sort(() => Math.random() - 0.5);
    // console.log('after two sort', cards);
    // for (let i = 0; i < 16; i += 1) {
    //   cards[i]['id'] = i + 1;
    // }
    // console.log('shuffled cards', cards);
    return cards;
  }

  onCardClick(id, cardStatus) {
    console.log('received cardStatus', cardStatus);
    // change isFlipped
    const isFlipped = true;
    const previousCardID = id;
    // check this.state.clickCount
    if (!this.state.clickCount) {
      const clickCount = 1;
      const previousCard = { ...cardStatus, isFlipped };
      console.log('updating state', previousCard);
      // need to find the card and update the is flipped
      const cards = [...this.state.cards];
      cards[previousCardID] = previousCard;
      return this.setState({
        ...this.state,
        cards,
        clickCount,
        previousCard,
        previousCardID,
      });
    }
    // add card to prevous card clicked
    // else (if count = 1), reset or change to 0?
    // check if current card value = previous card value
    // if matched, add 2 to this.state.match, keep the card isFlipped status
  }

  // check cards

  logInUser(user) {
    // send post request to server to log in
    // console.log("in log in user, arg taken in is", user);
    const newState = { ...this.state, user };
    this.setState(newState);
  }

  signUpUser(user) {
    // send post request to server to sign up
    const newState = { ...this.state, user };
    this.setState(newState);
  }

  render() {
    return (
      <div className="router">
        <Switch>
          <Route
            exact
            path="/signup" //temp, change back to '/' later
            render={(props) => (
              <Login {...props} state={this.state} logInUser={this.logInUser} />
            )}
          />
          <Route
            exact
            path="/signup"
            render={(props) => (
              <Signup
                {...props}
                state={this.state}
                signUpUser={this.signUpUser}
              />
            )}
          />
          <Route
            exact
            path="/" //temp, change back to '/game' later
            render={
              (props) => (
                // this.state.user.username ? (
                <Game
                  {...props}
                  state={this.state}
                  onCardClick={this.onCardClick}
                />
              )
              // ) : (
              //   <Redirect to="/" />
              // )
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
