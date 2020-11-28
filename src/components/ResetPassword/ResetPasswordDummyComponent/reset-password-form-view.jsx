import React from "react";
import ErrorPopUpMessage from '../../ErrorPopUpMessage'

const ResetPasswordFormView = (props) => {
  return (
    <div className="App-reset-password page-content">
      <h1 className="page-title">Reset Password</h1>
      <form className="reset-password-form page-form" onSubmit={props.onSubmit}>
        <input
          id="resetEmail"
          name="resetEmail"
          className="email-input form-input"
          type="email"
          placeholder="Email Address"
          value={props.resetEmail}
          onChange={props.onChange}
          required
        />

        <button
          disabled={props.isInvalid || props.isResetting}
          className={`submit-button ${props.isInvalid ? "disabled" : ""}`}
          type="submit"
        >
          {props.isResetting ? "Sending Email" : "Reset Password"}
        </button>

        <ErrorPopUpMessage OK={props.OK} error={props.error}></ErrorPopUpMessage>
      </form>
    </div>
  );
};

export default ResetPasswordFormView;
