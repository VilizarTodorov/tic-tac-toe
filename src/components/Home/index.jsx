import React from "react";
import { withAuthorization } from "../Session";

const INITIAL_STATE = {
  roomName: "",
  board: [null, null, null, null, null, null, null, null, null],
  X: "empty",
  O: "empty",
  owner: "",
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

  createRoom = () => {
    const room = this.generateRoom();
    const doc = this.props.firebase.createRoomEntry();
    const roomID = doc.id;
    doc.set({ ...room }).then(() => this.props.history.push(`/rooms/${roomID}`));
  };

  render() {
    const { roomName } = this.state;
    let isInvalid = roomName === "";
    return (
      <div>
        <h1>HOME</h1>
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

        <button disabled={isInvalid} className="create-room-button" onClick={this.createRoom}>
          Create room
        </button>
      </div>
    );
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Home);
