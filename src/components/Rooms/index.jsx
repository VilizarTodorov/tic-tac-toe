import React from "react";
import { withAuthorization } from "../Session";
import RoomsView from "./RoomsDummyComponent/rooms-view";
import "./styles.css";

const INITIAL_STATE = {
  rooms: [],
};

class Rooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    const rooms = [];
    this.props.firebase
      .getAllRooms()
      .then((snapshot) => {
        snapshot.forEach((doc) => rooms.push({ ...doc.data(), id: doc.id }));
      })
      .then(() => this.setState({ rooms }))
      .catch((err) => console.log(err));
  }

  render() {
    const { rooms } = this.state;

    return <RoomsView rooms={rooms}></RoomsView>;
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Rooms);
