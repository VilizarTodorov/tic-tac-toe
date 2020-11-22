import React from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import SignInFormView from "./SignInDummyComponent/sign-in-form-view";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: "",
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
    this.props.firebase
      .signInWithEmailAddress(email, password)
      .then((user) => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.replace(from);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = email === "" || password === "";

    return (
      <SignInFormView
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        email={email}
        password={password}
        isInvalid={isInvalid}
        error={error}
      />
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(BaseSignInForm);

export default SignInForm;
