import React from "react";
import { HOME } from "../../constants/routes";
import SingUpFormView from "./SignUpDummyComponent/sign-up-from-view";
import { withAuthorization } from "../Session";

const INITIAL_STATE = {
  email: "",
  username: "",
  password: "",
  repeatPassword: "",
  error: "",
  isSigningUp: false,
};

class BaseSignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //extract to helper functions
  OK = () => {
    this.setState({ error: null });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { email, password, username, repeatPassword } = this.state;
    const dbUSer = {
      username: username,
      wins: 0,
      losses: 0,
      points: 0,
    };

    if (password !== repeatPassword) {
      this.setState({ error: { message: "Password and Repeat Password must match" } });
      return;
    }

    this.setState({ isSigningUp: true }, () =>
      this.props.firebase
        .createUserWithEmail(email, password)
        .then(({ user }) => {
          this.props.firebase.createUserEntry(user.uid, dbUSer);
          this.props.history.replace(HOME);
        })
        .catch((error) => {
          this.setState({ error, isSigningUp: false });
        })
    );
  };

  render() {
    const { email, username, password, repeatPassword, error, isSigningUp } = this.state;

    return (
      <SingUpFormView
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        email={email}
        username={username}
        password={password}
        repeatPassword={repeatPassword}
        error={error}
        isSigningUp={isSigningUp}
        OK={this.OK}
      />
    );
  }
}

const condition = (authUser) => authUser == null;

export default withAuthorization(condition)(BaseSignUpForm);
