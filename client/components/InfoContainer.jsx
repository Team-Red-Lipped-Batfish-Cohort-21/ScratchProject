import React, { Component } from "react";
import { render } from "react-dom";

class InfoContainer extends Component {
  render() {

    return (
      <div className='currentUser'>
        <h1>Username: {this.props.state.user.username} </h1>
        <h1>Best Recored: {this.props.state.user.bestRecored}</h1>
        <h1>Number Of Clicks: {this.props.state.user.currentScore}</h1>
      </div>
    )
  }
}

export default InfoContainer;

// return (
//   <div className="innerbox" id="totals">

//     <label htmlFor="totalCards">Total Cards:</label>
//     <span id="totalCards">{props.totalCards}</span>
//     <p>
//       <label htmlFor="totalMarkets">Total Markets:</label>
//       <span id="totalCards">{props.totalMarkets}</span>
//     </p>
//   </div>
// );
