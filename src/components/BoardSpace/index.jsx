import React from "react";
import './styles.css'

const BoardSpace = (props) => {
  return (
    <button
      className="board-space"
      disabled={props.symbol ? true : false}
      onClick={() => {
        if (props.symbol) {
          return;
        }
        props.performPlayerTurn(props.index);
      }}
    >
      {props.symbol}
    </button>
  );
};

export default BoardSpace;
