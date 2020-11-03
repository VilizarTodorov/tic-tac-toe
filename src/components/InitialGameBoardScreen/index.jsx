import React from "react";
import "./styles.css";

const InitialGameBoardScreen = (props) => {
  return (
    <div className="initial-board">
      <div onClick={props.startGame} className="container">
        <svg
          className="x"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 51.6 51.6"
          style={{ enableBackground: "new 0 0 51.6 51.6" }}
          xmlSpace="preserve"
        >
          <line className="x__line x__line-2" x1="10.4" y1="10" x2="41.2" y2="41.6" />
          <line className="x__line x__line-1" x1="41.6" y1="10.4" x2="10" y2="41.2" />
        </svg>
      </div>
      <div className="container" onClick={props.startGame}>
        <svg
          className="o"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 60 60"
          style={{ enableBackground: "new 0 0 60 60" }}
          xmlSpace="preserve"
        >
          <circle className="o__line" cx="30" cy="30" r="20" />
        </svg>
      </div>
    </div>
  );
};

export default InitialGameBoardScreen;
