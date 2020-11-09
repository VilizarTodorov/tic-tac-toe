import React from "react";
import { withAuthorization } from "../Session";

const Home = (props) => {
  
  const generateRoom = () => {
    const room = {
      board: [null, null, null, null, null, null, null, null, null],
      playerX: "empty",
      playerO: "empty",
      owner: props.user.uid,
      isGameDone: false,
      message: "X’s turn",
      winner: "empty",
      currentPlayerTurn:'x',
      turns:0

    };
    return room;
  };

  const createRoom = () => {
    const room = generateRoom();
    const doc = props.firebase.createRoomEntry();
    const roomID = doc.id;
    doc.set({ ...room }).then(() => props.history.push(`/rooms/${roomID}`));
  };

  return (
    <div>
      <h1>HOME</h1>
      <button className="create-room-button" onClick={createRoom}>
        Create room
      </button>
    </div>
  );
};

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Home);
