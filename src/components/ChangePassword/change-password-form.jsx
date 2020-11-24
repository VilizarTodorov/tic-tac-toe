import React from "react";
import { withAuthorization } from "../Session";
import * as ROUTES from "../../constants/routes";
import ChangePasswordFormView from "./ChangePasswordDummyComponent/change-password-form-view";

const INITIAL_STATE = {
  newPassword: "",
  repeatNewPassword: "",
  error: null,
  isChanging: false,
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

    this.setState({ isChanging: true }, () =>
      this.props.firebase
        .updatePassword(newPassword)
        .then(() => {
          this.props.history.push(ROUTES.PROFILE);
        })
        .catch((error) => this.setState({ error, isChanging: false }))
    );

    event.preventDefault();
  };

  render() {
    const { newPassword, repeatNewPassword, error, isChanging } = this.state;
    const isInvalid = newPassword.length < 6 || newPassword !== repeatNewPassword;
    return (
      <ChangePasswordFormView
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        newPassword={newPassword}
        repeatNewPassword={repeatNewPassword}
        isInvalid={isInvalid}
        error={error}
        isChanging={isChanging}
      ></ChangePasswordFormView>
    );
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(ChangePasswordForm);
