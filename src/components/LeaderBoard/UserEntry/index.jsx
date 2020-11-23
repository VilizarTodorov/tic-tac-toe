import React from "react";
import "./styles.scss";

const UserEntry = (props) => {
  return (
    <div className="user-entity">
      <p>{props.username}</p>
      <p>Wins: {props.wins}</p>
      <p>Points: {props.points}</p>
    </div>
  );
};

export default UserEntry;
