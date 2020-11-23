import React from "react";
import UserEntry from "../UserEntry";

const LeaderBoardView = (props) => {
  const usersList = props.users.map((user, index) => {
    return (
      <li className="user" key={index}>
        <UserEntry username={user.username} wins={user.wins} losses={user.losses} points={user.points}></UserEntry>
      </li>
    );
  });

  return (
    <div className="App-leader-board-page App-page">
      <div className="page-content">
        <h1 className="page-title">Leader Board</h1>
        <ul className="leader-board">{usersList}</ul>
      </div>
    </div>
  );
};

export default LeaderBoardView;
