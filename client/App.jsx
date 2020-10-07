import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Game from './components/Game';
import Login from './components/Login';
import Signup from './components/Signup';

import './style.css';
import CardComponent from './Picture';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardCreated: false,
      user: {}, // {username, bestRecord, played}
      cardsArray: [],
      clickCount: 0,
      matched: 0, // increment when ever the 2 cards values match, game ends when matched = 16
      previousCard: {}, // add in the cardObj from cards
      previousCardID: -1,
      currentCard: {},
      currentCardID: -1,
      // allowFlipping: true,
      cardNeedUpdate: false,
      leaderBoard: {}, // { bestRecord: [{username: bestRecord}, ...], {mostPlays: [{username: played}, ... ] }  }
      found: null,
    };
    this.logInUser = this.logInUser.bind(this);
    this.signUpUser = this.signUpUser.bind(this);
    this.onCardClick = this.onCardClick.bind(this);
  }

  componentDidMount() {
    let cardsArray = this.createCardsArray();
    let cardCreated = !this.state.cardCreated;
    return this.setState({ ...this.state, cardsArray, cardCreated });
  }

  //each card is an object in the cardsArray
  createCardsArray() {
    const cardsArray = [];
    for (let i = 0; i < 8; i += 1) {
      const card = {
        flipped: false,
        cardValue: i,
        picture: CardComponent[i].content,
      };
      cardsArray.push(card);
      cardsArray.push(card);
      cardsArray.sort(() => Math.random() - 0.5); // Randomizer function
    }
    return cardsArray;
  }

  componentDidUpdate() {
    if (this.state.cardNeedUpdate) {
      const {
        currentCard,
        previousCard,
        matched,
        currentCardID,
        previousCardID,
      } = this.state;

      if (currentCard.cardValue === previousCard.cardValue) {
        console.log('found a match!');
        if (matched === 14) {
          setTimeout(() => {
            alert('game completed');
          }, 0);

          fetch('/api/update', {
            method: 'PUT',
            body: JSON.stringify({
              user: this.state.user,
              clickCount: this.state.clickCount,
            }),
            headers: {
              'Content-type': 'application/json',
            },
          })
            .then((data) => data.json())
            .then((data) => {
              const cardsArray = this.createCardsArray();
              const { user, leaderBoard } = data;
              return this.setState({
                ...this.state,
                user,
                leaderBoard,
                cardsArray,
                clickCount: 0,
                matched: 0,
                previousCard: {},
                previousCardID: -1,
                currentCard: {},
                currentCardID: -1,
                cardNeedUpdate: false,
                found: null,
              });
            });
        } else {
          // a match but not the final match
          // store the cardValue in found so we can disply the match in message
          const found = currentCard.cardValue;
          this.setState({
            ...this.state,
            matched: this.state.matched + 2,
            cardNeedUpdate: false,
            previousCard: {},
            previousCardID: -1,
            currentCard: {},
            currentCardID: -1,
            found,
          });
        }
      } else {
        console.log('not a match');
        previousCard.flipped = false;
        currentCard.flipped = false;
        const cardsArray = [...this.state.cardsArray];
        cardsArray[previousCardID] = previousCard;
        cardsArray[currentCardID] = currentCard;
        return setTimeout(() => {
          this.setState({
            ...this.state,
            cardsArray,
            previousCard: {},
            previousCardID: -1,
            currentCard: {},
            currentCardID: -1,
            cardNeedUpdate: false,
          });
        }, 1500);
      }
    }
  }

  onCardClick(id, cardStatus) {
    // console.log('received from id', id, cardStatus);
    const flipped = true;
    const clickCount = this.state.clickCount + 1;
    // on odd clicks (ie first click of the turn)
    if (clickCount % 2 === 1) {
      const previousCardID = id;
      const previousCard = { ...cardStatus, flipped };
      const cardsArray = [...this.state.cardsArray];
      cardsArray[previousCardID] = previousCard;
      return this.setState({
        ...this.state,
        cardsArray,
        clickCount,
        previousCard,
        previousCardID,
        found: null,
      });
    } else {
      // on even clicks (ie second click of the turn)
      const currentCard = { ...cardStatus, flipped };
      const currentCardID = id;
      const cardsArray = [...this.state.cardsArray];
      cardsArray[id] = currentCard;
      // at this point, the 2nd card is not flipped yet, so we need to update the state to complete the flipping
      // after components have been updated, we will check for if previous card value matches the current card value
      return this.setState({
        ...this.state,
        cardsArray,
        clickCount,
        currentCard,
        currentCardID,
        cardNeedUpdate: true,
      });
    }
  }

  logInUser(data) {
    // send post request to server to log in
    const { user, leaderBoard } = data;
    console.log('logged in user is', user);
    const newState = { ...this.state, user, leaderBoard };
    this.setState(newState);
  }

  signUpUser(data) {
    // send post request to server to sign up
    const { user, leaderBoard } = data;
    const newState = { ...this.state, user, leaderBoard };
    this.setState(newState);
  }

  render() {
    return (
      <div className="router">
        <Switch>
          <Route
            exact
            path="/"
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
            path="/game"
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
