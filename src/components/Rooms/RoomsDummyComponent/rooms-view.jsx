import React from "react";
import ErrorPopUpMessage from "../../ErrorPopUpMessage";
import RoomEntity from "../RoomEntity";
import "./styles.scss";

const RoomsView = (props) => {
  const roomsList = props.rooms.map((room, index) => {
    return (
      <li className="room" key={index}>
        <RoomEntity roomName={room.roomName} roomID={room.id}></RoomEntity>
      </li>
    );
  });

  return (
    <div className="App-rooms-page App-page">
      <div className="page-content">
        <h1 className="page-title">Rooms</h1>
        <ul className="rooms">{roomsList}</ul>
        <ErrorPopUpMessage OK={props.OK} error={props.error}></ErrorPopUpMessage>
      </div>
    </div>
  );
};

export default RoomsView;
