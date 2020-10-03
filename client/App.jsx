import React, { Component } from "react";
import { render } from "react-dom";
import { Switch, Route } from "react-router-dom";

import Game from "./components/Game";
import Login from "./components/Login";
import Signup from "./components/Signup";

import "./style.css";

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
    };
    this.logInUser = this.logInUser.bind(this);
    this.signUpUser = this.signUpUser.bind(this);
    this.createCardsArray = this.createCardsArray.bind(this);
    this.onCardClick = this.onCardClick.bind(this);
  }

  componentDidMount() {
    let cards = this.createCardsArray();
    const cardCreated = true;
    cards = this.shuffleCards(cards);
    return this.setState({ ...this.state, cards, cardCreated });
    console.log(this.state);
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
    console.log("cards are", cards);
    return cards;
    // return this.setState({ ...this.state, cards });
  }
  // shuffle cards array

  shuffleCards(cards) {
    cards.sort(() => Math.random() - 0.5);
    cards.sort(() => Math.random() - 0.5);
    return cards;
  }

  onCardClick(e) {
    console.log("card clicked!");
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
      <div className='router'>
        <Switch>
          <Route
            exact
            path='/signup' //temp, change back to '/' later
            render={(props) => (
              <Login {...props} state={this.state} logInUser={this.logInUser} />
            )}
          />
          <Route
            exact
            path='/signup'
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
            path='/' //temp, change back to '/game' later
            render={(props) => (
              <Game
                {...props}
                state={this.state}
                onCardClick={this.onCardClick}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
