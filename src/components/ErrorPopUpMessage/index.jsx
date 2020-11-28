import React from "react";
import "./styles.scss";

const ErrorPopUpMessage = (props) => {
  return (
    <div className={`error-pop-up-message ${props.error ? "hasError" : ""}`}>
      {props.error && <p className="error-message">{props.error.message}</p>}
      <button type='button' className="submit-button ok" onClick={props.OK}>
        OK
      </button>
    </div>
  );
};

export default ErrorPopUpMessage;
