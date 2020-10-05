import React, { Component } from "react";

const LeaderBoard = (props) => {
  console.log("props in leaderBoard", props.leaderBoard);
  const bestRecordsElem = props.leaderBoard.bestRecords.map((bestRecord, i) => {
    return (
      <li key={i}>
        {bestRecord.username}: {bestRecord.bestRecord}
      </li>
    );
  });
  const mostPlayedElem = props.leaderBoard.mostPlayed.map((mostplay, i) => {
    return (
      <li key={i}>
        {mostplay.username}: {mostplay.played}
      </li>
    );
  });
  return (
    <div className='recordsContainer'>
      <h3>LeaderBoard</h3>
      <div className='records'>
        <ol className='records-best-record'>
          <label>Best Record</label>
          {bestRecordsElem}
        </ol>
        <ol className='records-most-played'>
          <label>Most Played</label>
          {mostPlayedElem}
        </ol>
      </div>
    </div>
  );
};

export default LeaderBoard;
