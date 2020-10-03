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
      cardIds: [],
      score: 0,
      user: {
        username: "",
        password: "",
      },
      records: 0,
      cardFlipped: false,
    };
    this.logInUser = this.logInUser.bind(this);
    this.singUpUser = this.signUpUser.bind(this);
  }

  componentDidMount() {
    //
  }

  logInUser() {
    // send post request to server to log in
  }

  signUpUser() {
    // send post request to server to sign up
  }

  render() {
    return (
      <div className='router'>
        <Switch>
          <Route exact path='/' render={() => <Login state={this.state} />} />
          <Route
            exact
            path='/signup'
            render={() => <Signup state={this.state} />}
          />
          <Route
            exact
            path='/game'
            render={() => <Game state={this.state} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
