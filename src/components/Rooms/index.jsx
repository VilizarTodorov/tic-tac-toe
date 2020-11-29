import React from "react";
import { withAuthorization } from "../Session";
import RoomsView from "./RoomsDummyComponent/rooms-view";
import "./styles.scss";

const INITIAL_STATE = {
  rooms: [],
  error: null,
  isFetching: true,
};

class Rooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  OK = () => {
    this.setState({ error: null });
  };

  componentDidMount() {
    this.listener = this.props.firebase.getAllRoomsRef().onSnapshot(
      (snapshot) => {
        let rooms = [];
        snapshot.forEach((doc) => rooms.push({ ...doc.data(), id: doc.id }));
        this.setState({ rooms, isFetching: false });
      },
      (error) => {
        this.setState({ error, isFetching: false });
      }
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { rooms, isFetching, error } = this.state;

    return <RoomsView OK={this.OK} error={error} rooms={rooms} isFetching={isFetching}></RoomsView>;
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Rooms);
