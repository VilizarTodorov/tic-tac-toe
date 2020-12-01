import React from "react";
import { animated, config, useSpring } from "react-spring";
import ErrorPopUpMessage from "../../ErrorPopUpMessage";
import "./styles.scss";

const Controls = (props) => {
  const ownerName = useSpring({
    from: { transform: "rotateX(90deg)" },
    to: { transform: "rotateX(0)" },
    delay: 50,
    config: { ...config.wobbly },
  });

  const guestName = useSpring({
    from: { transform: "rotateX(90deg)" },
    to: { transform: "rotateX(0)" },
    delay: 100,
    config: { ...config.wobbly },
  });

  const kick = useSpring({
    from: { transform: "rotateX(90deg)" },
    to: { transform: "rotateX(0)", "flex-grow": "0.8", "margin-left": "auto" },
    delay: 150,
    config: { ...config.wobbly },
  });

  const leave = useSpring({
    from: { transform: "rotateX(90deg)" },
    to: { transform: "rotateX(0)", width: "100%" },
    delay: 200,
    config: { ...config.wobbly },
  });

  return (
    <div className="controls">
      <div className="users">
        <animated.div style={ownerName}>
          <p className={`game-user owner ${props.isOwnerX ? "player-x" : "player-o"}`}>{props.owner}</p>
        </animated.div>
        <div className="guest-controls">
          <animated.div style={guestName}>
            <p className={`game-user guest ${props.isOwnerX ? "player-o" : "player-x"}`}>{props.guest}</p>
          </animated.div>
          {props.isOwner && (
            <animated.div style={kick}>
              <button disabled={props.isKicking} className="control-button kick-button" onClick={props.kickGuest}>
                Kick{props.isKicking ? "ing" : ""}
              </button>
            </animated.div>
          )}
        </div>
      </div>

      <div className="button-container">
        <button
          disabled={props.offeredRematch}
          className={`rematch-button ${props.isGameDone ? "visible control-button" : ""}`}
          onClick={props.rematch}
        >
          {props.offeredRematch ? "Waiting for Opponent" : "Rematch"}
        </button>
        <animated.div style={leave}>
          <button disabled={props.isLeaving} onClick={props.leaveGame} className="control-button leave-button">
            Leav{props.isLeaving ? "ing" : "e"} Game
          </button>
        </animated.div>
      </div>
      <ErrorPopUpMessage OK={props.OK} error={props.error}></ErrorPopUpMessage>
    </div>
  );
};

export default Controls;
