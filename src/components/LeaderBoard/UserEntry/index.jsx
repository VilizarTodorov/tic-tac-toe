import React from "react";
import "./styles.css";

const UserEntry = (props) => {
  return (
    <div className="user-entry">
      <p>{props.username}</p>
      <p>Wins: {props.wins}</p>
      <p>Points: {props.points}</p>
    </div>
  );
};

export default UserEntry;
