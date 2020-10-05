import React, { Component } from 'react';
import { render } from 'react-dom';

class InfoContainer extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="currentUser">
        <h3>
          <strong>{this.props.state.user.username} </strong>
        </h3>
        <p id="user-best-record">
          Best Record: {this.props.state.user.bestRecord}
        </p>
        <p id="user-click-count">Click Count: {this.props.state.clickCount}</p>
        <audio
          controls
          src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"
        ></audio>
      </div>
    );
  }
}

export default InfoContainer;
