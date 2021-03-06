import React from "react";
import ErrorPopUpMessage from "../../ErrorPopUpMessage";
import GoBackButton from "../../GoBackButton";

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
          disabled={props.isResetting}
          className={`submit-button ${props.isResetting ? "disabled" : ""}`}
          type="submit"
        >
          {props.isResetting ? "Sending Email" : "Reset Password"}
        </button>


        <ErrorPopUpMessage OK={props.OK} error={props.error}></ErrorPopUpMessage>
      </form>
        <GoBackButton></GoBackButton>
    </div>
  );
};

export default ResetPasswordFormView;
