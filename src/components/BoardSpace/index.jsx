import React from "react";
import SymbolO from "../SymbolO";
import SymbolX from "../SymbolX";
import "./styles.css";

const BoardSpace = (props) => {
  return (
    <button
      className={`board-space ${props.symbol ? "disabled" : ""}`}
      onClick={() => {
        if (props.symbol) {
          return;
        }
        props.performPlayerTurn(props.index);
      }}
    >
      {props.symbol === 'x' && <SymbolX/>}
      {props.symbol === 'o' && <SymbolO/>}
    </button>
  );
};

export default BoardSpace;
