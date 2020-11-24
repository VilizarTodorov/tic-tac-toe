import React, { Fragment, useState } from "react";
import { withAuthorization } from "../../Session";
import { ERROR_MESSAGE, ROOM_IS_FULL } from "../../../constants/messages";
import "./styles.scss";

const JoinRoomButton = (props) => {
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState(null);

  const onClick = async () => {
    setIsJoining(true);
    try {
      await props.firebase.getRoom(props.roomID).then((doc) => {
        const { guest, owner } = doc.data();
        if (!guest || guest === props.user.uid || props.user.uid === owner) {
          props.history.push(`/rooms/${props.roomID}`);
          return;
        }
        alert(ROOM_IS_FULL);
      });
    } catch (err) {
      setError(err);
      setIsJoining(false);
    }
  };

  return (
    <Fragment>
      <button disabled={isJoining} className="join-button submit-button" onClick={onClick}>
        Join{isJoining ? "ing" : ""}
      </button>
      {error && alert(ERROR_MESSAGE)}
    </Fragment>
  );
};

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(JoinRoomButton);
