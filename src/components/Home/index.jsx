import React from "react";
import { withAuthorization } from "../Session";
import "./styles.css";

const INITIAL_STATE = {
  roomName: "",
  board: [null, null, null, null, null, null, null, null, null],
  X: "empty",
  O: "empty",
  owner: "",
  guest: "",
  isGameDone: false,
  message: "X’s turn",
  winner: "empty",
  currentPlayerTurn: "X",
  turns: 0,
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  generateRoom = () => {
    const room = { ...this.state };
    room.owner = this.props.user.uid;
    return room;
  };

  createRoom = (event) => {
    event.preventDefault();
    const room = this.generateRoom();
    const doc = this.props.firebase.createRoomEntry();
    const roomID = doc.id;
    doc.set({ ...room }).then(() => this.props.history.push(`/rooms/${roomID}`));
  };

  render() {
    const { roomName } = this.state;
    let isInvalid = roomName === "";
    return (
      <div className="App-home-page App-page">
        <div className="page-content">
          <h1 className="page-title">Welcome to Tic Tac Toe</h1>
          <h2 className="secondary-title">Create a room</h2>
          <form onSubmit={this.createRoom} className="home-form page-form">
            <input
              id="roomName"
              name="roomName"
              className="form-input"
              type="text"
              placeholder="Room Name"
              value={roomName}
              onChange={this.onChange}
              required
            />

            <button
              disabled={isInvalid}
              className={`submit-button ${isInvalid ? "disabled" : ""}`}
              onClick={this.createRoom}
            >
              Create room
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Home);
