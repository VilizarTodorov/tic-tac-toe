import React from "react";
import JoinRoomButton from "../JoinRoomButton";
import './styles.scss'

const RoomEntity = (props) => {
  return (
    <div className="room-entity">
      <p className="room-name">{props.roomName}</p>
      <JoinRoomButton roomID={props.roomID}></JoinRoomButton>
    </div>
  );
};

export default RoomEntity;
