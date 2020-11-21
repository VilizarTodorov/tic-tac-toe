import React from "react";
import { withFirebase } from "../Firebase";
import './styles.css'

const SignOut = (props) => {
  const onClick = () => {
    props.firebase.signOutUser();
  };

  return (
    <button className="submit-button sing-out-button" onClick={onClick}>
      Sign Out
    </button>
  );
};

export default withFirebase(SignOut);
