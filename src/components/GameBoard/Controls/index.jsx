import React from "react";
import "./styles.scss";

const Controls = (props) => {
  return (
    <div className="controls">
      <div className="users">
        <p className={`game-user owner ${props.isOwnerX ? "player-x" : "player-o"}`}>{props.owner}</p>
        <div className="guest-controls">
          <p className={`game-user guest ${props.isOwnerX ? "player-o" : "player-x"}`}>{props.guest}</p>
          {props.isOwner && (
            <button disabled={props.isKicking} className="control-button kick-button" onClick={props.kickGuest}>
              Kick{props.isKicking ? "ing" : ""}
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

        <button disabled={props.isLeaving} onClick={props.leaveGame} className="control-button leave-button">
          Leav{props.isLeaving ? "ing" : "e"} Game
        </button>
      </div>
    </div>
  );
};

export default Controls;
