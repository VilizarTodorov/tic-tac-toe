import React from "react";
import { withAuthorization } from "../Session";
import * as ROUTES from "../../constants/routes";

const INITIAL_STATE = {
  newPassword: "",
  repeatNewPassword: "",
  error: null,
};

class ChangePasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    const { newPassword } = this.state;
    this.props.firebase
      .updatePassword(newPassword)
      .then(() => {
        this.props.history.push(ROUTES.PROFILE);
      })
      .catch((error) => this.setState({ error }));

    event.preventDefault();
  };

  render() {
    const { newPassword, repeatNewPassword, error } = this.state;
    const isInvalid = newPassword.length < 6 || newPassword !== repeatNewPassword;
    return (
      <div className="App-change-password page-content">
        <h1 className="page-title">Change Password</h1>
        <form className="change-password-form page-form" onSubmit={this.onSubmit}>
          <input
            id="newPassword"
            name="newPassword"
            className="password-input form-input"
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={this.onChange}
            required
          />
          <input
            id="repeatNewPassword"
            name="repeatNewPassword"
            className="password-input form-input"
            type="password"
            placeholder="Repeat New Password"
            value={repeatNewPassword}
            onChange={this.onChange}
            required
          />

          <button disabled={isInvalid} className={`submit-button ${isInvalid ? "disabled" : ""}`} type="submit">
            Change Password
          </button>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(ChangePasswordForm);
