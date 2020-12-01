import React from "react";
import "./styles.scss";

const UserEntry = (props) => {
  return (
    <div className="user-entity">
      <p className="user-username">{props.username}</p>
      <p className="user-user-points">{`Points: ${props.points}`}</p>
    </div>
  );
};

export default UserEntry;
