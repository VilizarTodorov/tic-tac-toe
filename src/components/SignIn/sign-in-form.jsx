import React from "react";
import SignInFormView from "./SignInDummyComponent/sign-in-form-view";
import { withAuthorization } from "../Session";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: "",
  isSigningIn: false,
};

class BaseSignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  getFromLocation = () => {
    const { from } = this.props.location.state || { from: "/" };
    return from;
  };

  onSubmit = (event) => {
    const from = this.getFromLocation();
    const { email, password } = this.state;
    this.setState({ isSigningIn: true }, () =>
      this.props.firebase
        .signInWithEmailAddress(email, password)
        .then((user) => {
          this.props.history.replace(from);
        })
        .catch((error) => {
          this.setState({ error, isSigningIn: false });
        })
    );
    
    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error, isSigningIn } = this.state;

    const isInvalid = email === "" || password === "";

    return (
      <SignInFormView
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        isSigningIn={isSigningIn}
        email={email}
        password={password}
        isInvalid={isInvalid}
        error={error}
      />
    );
  }
}

const condition = (authUser) => authUser == null;

export default withAuthorization(condition)(BaseSignInForm);
