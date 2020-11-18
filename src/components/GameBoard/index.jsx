import React from "react";
import BoardSpace from "../BoardSpace";
import { HOME } from "../../constants/routes";
import { withAuthorization } from "../Session";
import Message from "./Message";
import "./styles.css";

const INITIAL_STATE = {
  board: [null, null, null, null, null, null, null, null, null],
  isGameDone: false,
  message: "X’s turn",
  winner: "empty",
  currentPlayerTurn: "X",
  turns: 0,
};

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  
  componentDidMount() {
    const roomID = this.getRoomId();
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

  performCheckBoard = (board, symbol, turns) => {
    if (turns >= 4) {
      if (symbol === "X" && this.checkBoard(board, symbol)) {
        return "XWINS";
      }
      if (symbol === "O" && this.checkBoard(board, symbol)) {
        return "OWINS";
      }
      if (turns === 8) {
        return "DRAW";
      }
    }
    return "NONE";
  };

  performPlayerTurn = (index) => {
    if (this.state.isGameDone) {
      return;
    }

    if (this.state.currentPlayerTurn === "X" && this.props.user.uid !== this.state.X) {
      return;
    }

    if (this.state.currentPlayerTurn === "O" && this.props.user.uid !== this.state.O) {
      return;
    }

    const roomID = this.getRoomId();

    const newBoard = [...this.state.board];
    newBoard[index] = this.state.currentPlayerTurn;
    let winner = "empty";
    let newMessage = "";
    let newIsGameDone = false;

    const checkBoardOutcome = this.performCheckBoard(newBoard, this.state.currentPlayerTurn, this.state.turns);

    switch (checkBoardOutcome) {
      case "XWINS":
        {
          winner = "X";
          newMessage = "X WINS";
          newIsGameDone = true;
        }

        break;

      case "OWINS":
        {
          winner = "O";
          newMessage = "O WINS";
          newIsGameDone = true;
        }

        break;

      case "DRAW":
        {
          newMessage = "DRAW!";
          newIsGameDone = true;
        }
        break;
      case "NONE":
      default:
        newMessage = `${this.state.currentPlayerTurn === "X" ? "O" : "X"}'s Turn`;
        break;
    }

    const newPlayerTurn = this.state.currentPlayerTurn === "X" ? "O" : "X";
    const newTurnNumber = this.state.turns + 1;

    const room = {
      board: newBoard,
      isGameDone: newIsGameDone,
      message: newMessage,
      currentPlayerTurn: newPlayerTurn,
      turns: newTurnNumber,
      winner,
    };

    this.props.firebase
      .updateRoomEntry(roomID, room)
      .then((x) => console.log("success", x))
      .catch((err) => console.log(err));
  };

  render() {
    const { board, message } = this.state;
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
      <div className="component-container">
        <Message message={message}></Message>
        <div className="board">{gameBoard}</div>
        <button className='clear-button' onClick={this.clearBoart}>Clear Board</button>
      </div>
    );
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(GameBoard);
