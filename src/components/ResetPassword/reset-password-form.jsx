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
    console.log('a')
    const { resetEmail, error, isResetting } = this.state;
    const isInvalid = resetEmail === "";
    return (
      <ResetPasswordFormView
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        resetEmail={resetEmail}
        isInvalid={isInvalid}
        error={error}
        isResetting={isResetting}
      ></ResetPasswordFormView>
    );
  }
}

export default compose(withRouter, withFirebase)(ResetPasswordForm);
