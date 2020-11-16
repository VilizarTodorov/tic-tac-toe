import React from "react";

const JoinRoomButton = (props) => {
  const onClick = () => {
    console.log("click");
  };

  return <button onClick={onClick}>Join</button>;
};
export default JoinRoomButton;
