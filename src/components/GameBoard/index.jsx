import React, { Fragment } from "react";
import BoardSpace from "../BoardSpace";
import { HOME } from "../../constants/routes";
import { withAuthorization } from "../Session";
import "./styles.css";

const INITIAL_STATE = {
  board: [null, null, null, null, null, null, null, null, null],
  isGameDone: false,
  message: "X’s turn",
  winner: "empty",
  currentPlayerTurn: "x",
  turns: 0,
};

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    const roomID = this.props.match.params.room;
    this.listener = this.props.firebase.getRoomEntry(roomID).onSnapshot((doc) => {
      if (doc.data()) {
        this.setState({
          ...doc.data(),
        });
      } else {
        this.props.history.replace(HOME);
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  getRoomId = () => {
    return this.props.match.params.room;
  };

  clearBoart = () => {
    const roomID = this.getRoomId();
    this.setState({ ...INITIAL_STATE }, () => this.props.firebase.updateRoomEntry(roomID, this.state));
  };

  checkBoard = (board, symbol) => {
    if (
      (board[0] === symbol && board[1] === symbol && board[2] === symbol) ||
      (board[3] === symbol && board[4] === symbol && board[5] === symbol) ||
      (board[6] === symbol && board[7] === symbol && board[8] === symbol) ||
      (board[0] === symbol && board[3] === symbol && board[6] === symbol) ||
      (board[1] === symbol && board[4] === symbol && board[7] === symbol) ||
      (board[2] === symbol && board[5] === symbol && board[8] === symbol) ||
      (board[0] === symbol && board[4] === symbol && board[8] === symbol) ||
      (board[2] === symbol && board[4] === symbol && board[6] === symbol)
    ) {
      return true;
    }

    return false;
  };

  performPlayerTurn = (index) => {
    if (this.state.isGameDone) {
      return;
    }

    const roomID = this.getRoomId();

    const newBoard = [...this.state.board];
    newBoard[index] = this.state.currentPlayerTurn;

    let hasWinner = false;

    if (this.state.turns >= 4) {
      hasWinner = this.checkBoard(newBoard, this.state.currentPlayerTurn);
      console.log(hasWinner);
    }

    this.setState(
      (state) => ({
        board: newBoard,
        currentPlayerTurn: state.currentPlayerTurn === "x" ? "o" : "x",
        message: state.message === "X’s turn" ? "O’s turn" : "X’s turn",
        isGameDone: hasWinner,
        turns: state.turns + 1,
      }),
      () => {
        this.props.firebase.updateRoomEntry(roomID, this.state);
      }
    );
  };

  render() {
    console.log(this.state);
    const { board } = this.state;

    const gameBoard = board.map((space, index) => {
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
      <Fragment>
        <div className="game">
          <div className="board">{gameBoard}</div>
        </div>
        <button onClick={this.clearBoart}>clearBoart</button>
      </Fragment>
    );
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(GameBoard);
