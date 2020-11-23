import React from "react";
import { withAuthorization } from "../../Session";
import "./styles.scss";

const JoinRoomButton = (props) => {
  const onClick = () => {
    props.firebase
      .getRoom(props.roomID)
      .then((doc) => {
        const { guest, owner } = doc.data();
        if (!guest || guest === props.user.uid || props.user.uid === owner) {
          props.history.push(`/rooms/${props.roomID}`);
          return;
        }
        alert("room is full");
      })
      .catch((error) => console.log(error));
  };

  return (
    <button className="join-button submit-button" onClick={onClick}>
      Join
    </button>
  );
};

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(JoinRoomButton);
