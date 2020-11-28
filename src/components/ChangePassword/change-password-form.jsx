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

  OK = () => {
    this.setState({ error: null });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { newPassword, repeatNewPassword } = this.state;

    if (newPassword !== repeatNewPassword) {
      this.setState({ error: { message: "New Password and Repeat New Password must match" } });
      return;
    }

    this.setState({ isChanging: true }, () =>
      this.props.firebase
        .updatePassword(newPassword)
        .then(() => {
          this.props.history.push(ROUTES.PROFILE);
        })
        .catch((error) => this.setState({ error, isChanging: false }))
    );

  };

  render() {
    const { newPassword, repeatNewPassword, error, isChanging } = this.state;
    return (
      <ChangePasswordFormView
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        newPassword={newPassword}
        repeatNewPassword={repeatNewPassword}
        error={error}
        isChanging={isChanging}
        OK={this.OK}
      ></ChangePasswordFormView>
    );
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(ChangePasswordForm);
