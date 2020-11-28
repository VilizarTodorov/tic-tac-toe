import React from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { SIGN_IN } from "../../constants/routes";
import ResetPasswordFormView from "./ResetPasswordDummyComponent/reset-password-form-view";

const INITIAL_STATE = {
  resetEmail: "",
  error: null,
  isResetting: false,
};

class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  OK = () => {
    this.setState({ error: null });
    return;
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    const { resetEmail } = this.state;

    this.setState({ isResetting: true }, () =>
      this.props.firebase
        .passwordReset(resetEmail)
        .then(() => {
          this.props.history.push(SIGN_IN);
        })
        .catch((error) => this.setState({ error, isResetting: false }))
    );

    event.preventDefault();
  };

  render() {
    const { resetEmail, error, isResetting } = this.state;
    return (
      <ResetPasswordFormView
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        resetEmail={resetEmail}
        error={error}
        isResetting={isResetting}
        OK={this.OK}
      ></ResetPasswordFormView>
    );
  }
}

export default compose(withRouter, withFirebase)(ResetPasswordForm);
