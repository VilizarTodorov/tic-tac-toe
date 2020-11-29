import React from "react";
import ErrorPopUpMessage from "../../ErrorPopUpMessage";

const ChangePasswordFormView = (props) => {
  return (
    <div className="App-change-password page-content">
      <h1 className="page-title">Change Password</h1>
      <form className="change-password-form page-form" onSubmit={props.onSubmit}>
        <input
          id="newPassword"
          name="newPassword"
          className="password-input form-input"
          type="password"
          placeholder="Enter New Password"
          value={props.newPassword}
          onChange={props.onChange}
          required
        />
        <input
          id="repeatNewPassword"
          name="repeatNewPassword"
          className="password-input form-input"
          type="password"
          placeholder="Repeat New Password"
          value={props.repeatNewPassword}
          onChange={props.onChange}
          required
        />

        <button
          disabled={props.isChanging}
          className={`submit-button ${props.isChanging ? "disabled" : ""}`}
          type="submit"
        >
          Chang{props.isChanging ? "ing" : "е"} Password
        </button>

        <ErrorPopUpMessage OK={props.OK} error={props.error}></ErrorPopUpMessage>
      </form>
    </div>
  );
};

export default ChangePasswordFormView;
