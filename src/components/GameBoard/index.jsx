import React from "react";
import BoardSpace from "../BoardSpace";
import { HOME, ROOMS } from "../../constants/routes";
import { withAuthorization } from "../Session";
import Message from "./Message";
import Controls from "./Controls";
import "./styles.scss";
import { config, Spring } from "react-spring/renderprops";

const INITIAL_STATE = {
  board: [null, null, null, null, null, null, null, null, null],
  isGameDone: false,
  message: "X’s Turn",
  winner: "empty",
  currentPlayerTurn: "X",
  turns: 0,
  ownerWantsRematch: false,
  guestWantsRematch: false,
};

const INITIAL_USER_OBJ = {
  username: "",
  wins: 0,
  losses: 0,
  points: 0,
};

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      ownerDbEntry: { ...INITIAL_USER_OBJ },
      guestDbEntry: { ...INITIAL_USER_OBJ },
      isUpdating: true,
      isKicking: false,
      isLeaving: false,
      offeredRematch: false,
      error: null,
    };
  }

  componentDidMount() {
    const roomID = this.getRoomId();

    this.listener = this.props.firebase.getRoomEntry(roomID).onSnapshot(
      (doc) => {
        if (doc.data()) {
          const { owner, guest, ownerWantsRematch, guestWantsRematch, isGameDone } = doc.data();

          if (!guest) {
            this.setState({ guestDbEntry: { ...INITIAL_USER_OBJ } });
          }

          if (!this.state.ownerDbEntry.username) {
            this.props.firebase
              .getUserEntry(owner)
              .then((ownerDoc) => this.setState({ ownerDbEntry: { ...ownerDoc.data() } }));
          }

          if (!this.state.guestDbEntry.username && guest) {
            this.props.firebase
              .getUserEntry(guest)
              .then((guestDoc) => this.setState({ guestDbEntry: { ...guestDoc.data() } }));
          }

          if (isGameDone) {
            if (guest) {
              this.props.firebase
                .getUserEntry(guest)
                .then((guestDoc) => this.setState({ guestDbEntry: { ...guestDoc.data() } }));
            }

            this.props.firebase
              .getUserEntry(owner)
              .then((ownerDoc) => this.setState({ ownerDbEntry: { ...ownerDoc.data() } }));

            if ((ownerWantsRematch && guestWantsRematch) || !guest) {
              const { X, O } = doc.data();
              this.clearBoart(X, O);
            }
          }

          if (this.props.user.uid !== owner && this.props.user.uid !== guest) {
            this.props.history.replace(ROOMS);
          }

          this.setState({
            ...doc.data(),
            isUpdating: false,
            isKicking: false,
          });
        } else {
          this.props.history.replace(HOME);
        }
      },
      (error) => {
        this.setState({ isUpdating: false, isKicking: false, error });
      }
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  OK = () => {
    this.setState({error:null})
  }

  getRoomId = () => {
    return this.props.match.params.room;
  };

  clearBoart = (oldX, oldO) => {
    this.setState({ isUpdating: true, offeredRematch: false }, () => {
      const roomID = this.getRoomId();
      this.props.firebase.updateRoomEntry(roomID, { ...INITIAL_STATE, X: oldO, O: oldX });
    });
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
    if (this.state.isUpdating) {
      return;
    }

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
        winner = "X";
        newMessage = "X WINS";
        newIsGameDone = true;

        break;

      case "OWINS":
        winner = "O";
        newMessage = "O WINS";
        newIsGameDone = true;

        break;

      case "DRAW":
        newMessage = "DRAW!";
        newIsGameDone = true;

        break;
      case "NONE":
      default:
        newMessage = `${this.state.currentPlayerTurn === "X" ? "O" : "X"}’s Turn`;
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

    this.setState({ isUpdating: true }, () => {
      this.markLossAndWinForPlayers(winner);
      this.props.firebase.updateRoomEntry(roomID, room);
    });
  };

  removeGuest = (roomID) => {
    const symbol = this.state.guest === this.state.X ? "X" : "O";
    const updateObj = { [symbol]: "empty", guest: "" };

    this.props.firebase.updateRoomEntry(roomID, updateObj);
  };

  ownerLeaveGame = (roomID) => {
    this.props.firebase.deleteRoom(roomID);
  };

  guestLeaveGame = (roomID) => {
    this.removeGuest(roomID);
  };

  kickGuest = () => {
    if (this.state.isUpdating) {
      this.setState({ error: { message: "Please wait a few seconds"}});
      return;
    }

    if (!this.state.guest) {
      this.setState({ error: { message: "There is no guest to kick UwU"}});
      return;
    }

    this.setState({ isKicking: true, isUpdating: true }, () => {
      const roomID = this.getRoomId();
      this.removeGuest(roomID);
    });
  };

  leaveGameRoom = () => {
    if (this.state.isUpdating) {
      this.setState({ error: { message: "Please wait a few seconds"}});
      return;
    }

    this.setState({ isLeaving: true, isUpdating: true }, () => {
      const roomID = this.getRoomId();

      if (this.props.user.uid === this.state.owner) {
        this.ownerLeaveGame(roomID);
        return;
      }

      this.guestLeaveGame(roomID);
    });
  };

  rematch = () => {
    this.setState({ offeredRematch: true }, () => {
      const roomID = this.getRoomId();

      if (this.props.user.uid === this.state.guest) {
        this.props.firebase.updateRoomEntry(roomID, { guestWantsRematch: true });
      }

      if (this.props.user.uid === this.state.owner) {
        this.props.firebase.updateRoomEntry(roomID, { ownerWantsRematch: true });
      }
    });
  };

  markLossAndWinForPlayers = (winner) => {
    if (winner !== "empty") {
      const loserEntry = winner === "X" ? this.state["O"] : this.state["X"];
      if (loserEntry === this.state.owner) {
        this.markLoss(this.state.owner, this.state.ownerDbEntry);

        this.markWin(this.state.guest, this.state.guestDbEntry);
      } else {
        this.markWin(this.state.owner, this.state.ownerDbEntry);

        this.markLoss(this.state.guest, this.state.guestDbEntry);
      }
    }
  };

  markWin = (id, userEntry) => {
    this.props.firebase.updateUserEntry(id, {
      wins: userEntry.wins + 1,
      points: userEntry.points + 1,
    });
  };

  markLoss = (id, userEntry) => {
    this.props.firebase.updateUserEntry(id, {
      losses: userEntry.losses + 1,
      points: userEntry.points - 1,
    });
  };

  render() {
    const {
      board,
      message,
      owner,
      isGameDone,
      X,
      ownerDbEntry,
      guestDbEntry,
      isLeaving,
      isKicking,
      offeredRematch,
      error,
    } = this.state;

    const isOwner = this.props.user.uid === owner;

    const isOwnerX = owner === X;

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
        <Spring
          from={{ transform: "scale(0)" }}
          to={{ transform: "scale(1)" }}
          config={{ delay: 400, ...config.wobbly }}
        >
          {(props) => (
            <div style={props}>
              <Controls
                owner={ownerDbEntry.username}
                guest={guestDbEntry.username}
                isOwner={isOwner}
                isGameDone={isGameDone}
                rematch={this.rematch}
                isOwnerX={isOwnerX}
                leaveGame={this.leaveGameRoom}
                kickGuest={this.kickGuest}
                isLeaving={isLeaving}
                isKicking={isKicking}
                offeredRematch={offeredRematch}
                error={error}
                OK={this.OK}
              ></Controls>
            </div>
          )}
        </Spring>
      </div>
    );
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(GameBoard);
