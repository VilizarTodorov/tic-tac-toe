import React from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";

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
      <div className="sign-in-form">
        <h1>Sign In</h1>
        <form onSubmit={this.onSubmit} className="from sign-in-form">
          <input
            id="email"
            name="email"
            className="email-input form-input"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={this.onChange}
            required
          />

          <input
            id="password"
            className="password-input form-input"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={this.onChange}
            required
          />

          <button disabled={isInvalid} type="submit">
            Sign In
          </button>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(BaseSignInForm);

export default SignInForm;
