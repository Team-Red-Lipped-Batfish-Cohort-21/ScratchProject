import React, { Component } from 'react';
import { render } from 'react-dom';
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
      user: {}, // username, bestRecord, played
      cardsArray: [], // {isFlipped: t/f, value:  , id: }
      clickCount: 0, // if clickCount = 2, then we check the card value, reset clickCount
      // bestRecord: 0,
      matched: 0, // increment when ever the 2 cards values match, game ends when matched = 16
      previousCard: {}, // add in the cardObj from cards
      previousCardID: -1,
      currentCard: {},
      currentCardID: -1,
      // allowFlipping: true,
      cardNeedUpdate: false,
      leaderBoard: {}, // { bestRecord: [{username: bestRecord}, ...], {mostPlays: [{username: played}, ... ] }  }
      found: '',
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

  componentDidUpdate(prevProps, prevState) {
    // check if the values are the same
    if (this.state.cardNeedUpdate) {
      console.log('hello from if statement');
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
                found: '',
              });
            });
          // const cardsArray = this.createCardsArray();
          // return setTimeout(() => {
          //   this.setState({
          //     ...this.state,
          //     cardsArray,
          //     clickCount: 0,
          //     matched: 0,
          //     previousCard: {},
          //     previousCardID: -1,
          //     currentCard: {},
          //     currentCardID: -1,
          //     cardNeedUpdate: false,
          //   }),
          //     1500;
          // });
        } else {
          // a match but not the final match
          const names = [
            'Will',
            'Phill',
            'Kyle',
            'Sara',
            'Keiran',
            'Jeho',
            'Wayne',
            'Midori',
          ];
          const found = names[currentCard.cardValue];

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
      cardsArray.sort(() => Math.random() - 0.5);
    }
    return cardsArray;
  }

  onCardClick(id, cardStatus) {
    console.log('received from id', id, cardStatus);
    // change isFlipped
    const flipped = true;

    // check this.state.clickCount
    const clickCount = this.state.clickCount + 1;
    if (clickCount % 2 === 1) {
      // on odd clicks (ie first click of the turn)
      const previousCardID = id;
      const previousCard = { ...cardStatus, flipped };
      // console.log("updating state", previousCard);
      // need to find the card and update the is flipped
      const cardsArray = [...this.state.cardsArray];
      cardsArray[previousCardID] = previousCard;
      console.log(cardsArray);
      return this.setState({
        ...this.state,
        cardsArray,
        clickCount,
        previousCard,
        previousCardID,
        found: '',
      });
    } else {
      // on even clicks (ie second click of the turn)
      const currentCard = { ...cardStatus, flipped };
      const currentCardID = id;
      // at this point, the 2nd card is not flipped yet, so we need to update the state to implete the flipping
      // after components have been updated, we will check for if previous card value matches the current card value

      const cardsArray = [...this.state.cardsArray];
      cardsArray[id] = currentCard;

      return this.setState({
        ...this.state,
        cardsArray,
        clickCount,
        currentCard,
        currentCardID,
        cardNeedUpdate: true,
      });
    }
    // check if values are the same
    //   if (
    //     currentCard.cardValue === this.state.previousCard.cardValue &&
    //     this.state.previousCardID !== id
    //   ) {
    //     console.log("found a matched!");
    //     if (this.state.matched === 14) {
    //       // game over
    //       alert("game completed");
    //       const newCardsArray = this.createCardsArray();
    //       return setTimeout(() => {
    //         this.setState({
    //           ...this.state,
    //           cardsArray: newCardsArray,
    //           clickCount: 0,
    //           matched: 0,
    //           previousCard: {},
    //           previousCardID: -1,
    //         }),
    //           3000;
    //       });
    //     }
    //     const cardsArray = [...this.state.cardsArray];
    //     cardsArray[id] = currentCard; // currentCard.flipped = true;

    //     return this.setState({
    //       ...this.state,
    //       clickCount,
    //       cardsArray,
    //       matched: this.state.matched + 2,
    //       previousCard: {},
    //       previousCardID: -1,
    //     });
    //   } else {
    //     console.log("not a match");
    //     // reset the previous card and current card to !flipped
    //     const flipped = false;
    //     const previousCard = { ...this.state.previousCard, flipped };
    //     // const currentCard = { ...this.state.currentCard, flipped };
    //     const cardsArray = [...this.state.cardsArray];
    //     cardsArray[this.state.previousCardID] = previousCard;
    //     // console.log(cardsArray);
    //     //
    //     return setTimeout(() => {
    //       this.setState({
    //         ...this.state,
    //         cardsArray,
    //         clickCount,
    //         previousCard: {},
    //         previousCardID: -1,
    //       });
    //     }, 3000);
    //   }
    // }
    // add card to prevous card clicked
    // else (if count = 1), reset or change to 0?
    // check if current card value = previous card value
    // if matched, add 2 to this.state.match, keep the card isFlipped status
  }

  logInUser(data) {
    // send post request to server to log in
    // console.log("in log in user, arg taken in is", user);
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
            path="/" //temp, change back to '/' later
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
            path="/game" //temp, change back to '/game' later
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
