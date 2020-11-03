import React from "react";
import BoardSpace from "../BoardSpace";
import "./styles.css";

const INITIAL_STATE = {
  currentPlayer: "x",
  boardSpaces: [null, null, null, null, null, null, null, null, null],
};

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  performPlayerTurn = (index) => {
    const newBoard = [...this.state.boardSpaces];
    newBoard[index] = this.state.currentPlayer;

    this.setState((state, props) => ({
      boardSpaces: newBoard,
      currentPlayer: state.currentPlayer === "x" ? "o" : "x",
    }));
  };

  render() {
    const { boardSpaces } = this.state;

    const board = boardSpaces.map((space, index) => {
      return (
        <BoardSpace
          key={`board-space-number-${index}`}
          performPlayerTurn={this.performPlayerTurn}
          index={index}
          symbol={space}
        ></BoardSpace>
      );
    });

    return (
      <div className="game">
        <div className="board">{board}</div>;
      </div>
    );
  }
}

export default GameBoard;
