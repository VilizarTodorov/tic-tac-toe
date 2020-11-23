import React from "react";
import SymbolO from "../SymbolO";
import SymbolX from "../SymbolX";
import "./styles.scss";

const BoardSpace = (props) => {
  return (
    <button
      disabled={props.symbol ? true : false}
      className={`board-space ${props.symbol ? "disabled" : ""}`}
      onClick={() => {
        if (props.symbol) {
          return;
        }
        props.performPlayerTurn(props.index);
      }}
    >
      {props.symbol === "X" && <SymbolX />}
      {props.symbol === "O" && <SymbolO />}
    </button>
  );
};

export default BoardSpace;
