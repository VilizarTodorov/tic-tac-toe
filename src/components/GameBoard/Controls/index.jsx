import React from "react";
import "./styles.css";

const Controls = (props) => {
  return (
    <div className="controls">
      <div className="users">
        <p className={`user owner ${props.isOwnerX ? "player-x" : "player-o"}`}>{props.owner}</p>
        <div className="guest-controls">
          <p className={`user guest ${props.isOwnerX ? "player-o" : "player-x"}`}>{props.guest}</p>
          {props.isOwner && (
            <button className="control-button kick-button" onClick={props.kickGuest}>
              Kick
            </button>
          )}
        </div>
      </div>

      <div className="button-container">
        <button
          className={`rematch-button ${props.isGameDone ? "visible control-button" : ""}`}
          onClick={props.rematch}
        >
          Rematch
        </button>

        <button onClick={props.leaveGame} className="control-button leave-button" onClick={props.leaveGame}>
          Leave Game
        </button>
      </div>
    </div>
  );
};

export default Controls;
