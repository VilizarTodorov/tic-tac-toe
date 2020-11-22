import React from "react";
import RoomEntity from "../RoomEntity";

const RoomsView = (props) => {
  return (
    <div className="App-rooms-page App-page">
      <div className="page-content">
        <h1 className="page-title">Rooms</h1>
        <ul className="rooms">
          {props.rooms.map((room, index) => {
            return (
              <li key={index}>
                <RoomEntity roomName={room.roomName} roomID={room.id}></RoomEntity>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RoomsView;
