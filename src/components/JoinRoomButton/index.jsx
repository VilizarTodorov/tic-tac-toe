import React from "react";
import { withAuthorization } from "../Session";

const JoinRoomButton = (props) => {
  const onClick = () => {
    props.firebase
      .getRoom(props.roomID)
      .then((doc) => {
        const { guest } = doc.data();
        if (!guest) {
          props.firebase.updateRoomEntry(props.roomID, { guest: props.user.uid });
          props.history.push(`/rooms/${props.roomID}`);
          return;
        }
        alert("room is full");
      })
      .catch((error) => console.log(error));
  };

  return <button onClick={onClick}>Join</button>;
};

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(JoinRoomButton);
