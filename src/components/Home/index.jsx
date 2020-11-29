import React from "react";
import { withAuthorization } from "../Session";
import HomeView from "./HomeDummyComponent/home-view";
import "./styles.scss";

const INITIAL_ROOM_STATE = {
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
  ownerWantsRematch: false,
  guestWantsRematch: false,
};

const INITIAL_STATE = {
  roomName: "",
  error: null,
  isCreating: false,
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  OK = () => {
    this.setState({ error: null });
    return;
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  generateRoom = () => {
    const room = { ...INITIAL_ROOM_STATE };
    room.owner = this.props.user.uid;
    room.roomName = this.state.roomName;
    return room;
  };

  createRoom = (event) => {
    const room = this.generateRoom();
    const doc = this.props.firebase.createRoomEntry();
    const roomID = doc.id;

    this.setState({ isCreating: true }, () =>
      doc
        .set({ ...room })
        .then(() => this.props.history.push(`/rooms/${roomID}`))
        .catch((error) => this.setState({ error, isCreating: false }))
    );

    event.preventDefault();
  };

  render() {
    const { roomName, isCreating, error } = this.state;
    return (
      <HomeView
        isCreating={isCreating}
        createRoom={this.createRoom}
        roomName={roomName}
        onChange={this.onChange}
        error={error}
        OK={this.OK}
      />
    );
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Home);
