import React from "react";
import { withFirebase } from "../Firebase";

const SignOut = (props) => {
  const onClick = () => {
      props.firebase.signOutUser();
  };

  return <button onClick={onClick}>Sign Out</button>;
};

export default withFirebase(SignOut);
