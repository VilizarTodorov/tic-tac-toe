import React from "react";
import JoinRoomButton from "../JoinRoomButton";
import './styles.css'

const RoomEntity = (props) => {
  return (
    <div className="room-entity">
      <p>{props.roomName}</p>
      <JoinRoomButton></JoinRoomButton>
    </div>
  );
};

export default RoomEntity;
