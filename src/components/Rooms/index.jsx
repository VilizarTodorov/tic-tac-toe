import React from "react";
import { withAuthorization } from "../Session";

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
        snapshot.forEach((doc) => console.log(doc.data()));
      })
      .then(() => this.setState({ rooms }))
      .catch((err) => console.log(err));
  }

  render() {
    const { rooms } = this.state;
    const roomsList = rooms.map((room, index) => {
      return <li key={index}>{index}</li>;
    });

    return (
      <div>
        <ul>{roomsList}</ul>
      </div>
    );
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Rooms);
