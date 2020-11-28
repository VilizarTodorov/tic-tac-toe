import React, { Fragment, useState } from "react";
import { withFirebase } from "../Firebase";
import ErrorPopUpMessage from "../ErrorPopUpMessage";

import "./styles.scss";

const SignOut = (props) => {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [error, setError] = useState(null);

  const OK = () => {
    setError(null)
  }

  const onClick = () => {
    setIsSigningOut(true);

    props.firebase.signOutUser().catch((err) => {
      setError(err);
      setIsSigningOut(false);
    });
  };

  return (
    <Fragment>
      <button disabled={isSigningOut} className="submit-button sign-out-button" onClick={onClick}>
        Sign{isSigningOut ? "ing" : ""} Out
      </button>
      <ErrorPopUpMessage OK={OK} error={error}></ErrorPopUpMessage>
    </Fragment>
  );
};

export default withFirebase(SignOut);
