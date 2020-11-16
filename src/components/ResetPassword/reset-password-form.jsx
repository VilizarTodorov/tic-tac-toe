import React from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { SIGN_IN } from "../../constants/routes";

const INITIAL_STATE = {
  resetEmail: "",
  error: null,
};

class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { resetEmail } = this.state;
    this.props.firebase
      .passwordReset(resetEmail)
      .then(() => {
        this.props.history.push(SIGN_IN);
      })
      .catch((error) => this.setState({ error }));
  };

  render() {
    const { resetEmail, error } = this.state;
    const isInvalid = resetEmail === "";
    return (
      <div className="App-reset-password page-content">
        <h1 className="page-title">Reset Password</h1>
        <form className="reset-password-form page-form" onSubmit={this.onSubmit}>
          <input
            id="resetEmail"
            name="resetEmail"
            className="email-input form-input"
            type="email"
            placeholder="Email Address"
            value={resetEmail}
            onChange={this.onChange}
            required
          />

          <button disabled={isInvalid} className={`submit-button ${isInvalid ? "disabled" : ""}`} type="submit">
            Reset Password
          </button>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default compose(withRouter, withFirebase)(ResetPasswordForm);
