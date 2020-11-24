import React, { Fragment, useState } from "react";
import { withFirebase } from "../Firebase";
import { ERROR_MESSAGE } from "../../constants/messages";
import "./styles.scss";

const SignOut = (props) => {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [error, setError] = useState(null);

  const onClick = async () => {
    setIsSigningOut(true);

    try {
      await props.firebase.signOutUser();
    } catch (err) {
      setError(err);
      setIsSigningOut(false);
    }
  };

  return (
    <Fragment>
      <button disabled={isSigningOut} className="submit-button sign-out-button" onClick={onClick}>
        Sign{isSigningOut ? "ing" : ""} Out
      </button>
      {error && alert(ERROR_MESSAGE)}
    </Fragment>
  );
};

export default withFirebase(SignOut);
