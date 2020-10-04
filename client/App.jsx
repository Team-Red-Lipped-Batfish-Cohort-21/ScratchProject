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
      user: {}, // username, bestRecord, played
      cardsArray: [], // {isFlipped: t/f, value:  , id: }
      clickCount: 0, // if clickCount = 2, then we check the card value, reset clickCount
      bestRecord: 0,
      matched: 0, // increment when ever the 2 cards values match, game ends when matched = 16
      previousCard: {}, // add in the cardObj from cards
      previousCardID: -1,
      allowFlipping: true,
    };
    this.logInUser = this.logInUser.bind(this);
    this.signUpUser = this.signUpUser.bind(this);
    this.createCardsArray = this.createCardsArray.bind(this);
    this.onCardClick = this.onCardClick.bind(this);
  }

  componentDidMount() {
    let cardsArray = this.createCardsArray();
    let cardCreated = true;
    return this.setState({ ...this.state, cardsArray, cardCreated });
  }

  //each card is an object in the cardsArray
  createCardsArray() {
    const cardsArray = [];
    for (let i = 0; i < 8; i += 1) {
      const card = {
        flipped: false,
        cardValue: i,
      };
      cardsArray.push(card);
      cardsArray.push(card);
      cardsArray.sort(() => Math.random() - 0.5);
    }
    return cardsArray;
  }

  // // shuffle cards array

  // shuffleCards(cards) {
  //   cards.sort(() => Math.random() - 0.5);
  //   // console.log('after one sort', cards);
  //   cards.sort(() => Math.random() - 0.5);
  //   // console.log('after two sort', cards);
  //   // for (let i = 0; i < 16; i += 1) {
  //   //   cards[i]['id'] = i + 1;
  //   // }
  //   // console.log('shuffled cards', cards);
  //   return cards;
  // }

  onCardClick(id, cardStatus) {
    // console.log("received cardStatus", cardStatus);
    // change isFlipped
    const flipped = true;
    const previousCardID = id;
    // check this.state.clickCount
    const clickCount = this.state.clickCount + 1;
    if (clickCount % 2 === 1) {
      // on odd clicks (ie first click of the turn)
      const previousCard = { ...cardStatus, flipped };
      // console.log("updating state", previousCard);
      // need to find the card and update the is flipped
      const cardsArray = [...this.state.cardsArray];
      cardsArray[previousCardID] = previousCard;
      return this.setState({
        ...this.state,
        cardsArray,
        clickCount,
        previousCard,
        previousCardID,
      });
    } else {
      // on even clicks (ie second click of the turn)
      // update the allowFlipping
      const currentCard = { ...cardStatus, flipped };

      // check if values are the same
      if (currentCard.cardValue === this.state.previousCard.cardValue) {
        console.log("found a matched!");
        const cardsArray = [...this.state.cardsArray];
        cardsArray[id] = currentCard; // currentCard.flipped = true;

        return this.setState({
          ...this.state,
          clickCount,
          cardsArray,
          matched: this.state.matched + 2,
          previousCard: {},
          previousCardID: -1,
        });
      } else {
        console.log("not a match");
        // reset the previous card and current card to !flipped
        const flipped = false;
        const previousCard = { ...this.state.previousCard, flipped };
        // const currentCard = { ...this.state.currentCard, flipped };
        const cardsArray = [...this.state.cardsArray];
        cardsArray[previousCardID] = previousCard;

        //
        return this.setState({
          ...this.state,
          cardsArray,
          clickCount,
          previousCard: {},
          previousCardID: -1,
        });
      }
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
