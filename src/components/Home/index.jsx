import React from "react";
import { withAuthorization } from "../Session";
import HomeView from "./HomeDummyComponent/home-view";
import "./styles.scss";

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
  ownerWantsRematch: false,
  guestWantsRematch: false,
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
    doc
      .set({ ...room })
      .then(() => this.props.history.push(`/rooms/${roomID}`))
  };

  render() {
    const { roomName } = this.state;
    let isInvalid = roomName === "";
    return <HomeView createRoom={this.createRoom} roomName={roomName} onChange={this.onChange} isInvalid={isInvalid} />;
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Home);
