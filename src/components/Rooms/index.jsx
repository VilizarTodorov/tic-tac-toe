import React from "react";
import { withAuthorization } from "../Session";
import RoomEntry from '../RoomEntity'
import './styles.css'

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
        snapshot.forEach((doc) => rooms.push(doc.data()));
      })
      .then(() => this.setState({ rooms }))
      .catch((err) => console.log(err));
  }

  render() {
    const { rooms } = this.state;
    const roomsList = rooms.map((room, index) => {
      return <li key={index}><RoomEntry roomName={room.roomName}></RoomEntry></li>;
    });

    return (
      <div className="App-rooms-page App-page">
        <div className="page-content">
        <h1 className='page-title'>Rooms</h1>
        <ul className='rooms'>{roomsList}</ul>
        </div>
      </div>
    );
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Rooms);
