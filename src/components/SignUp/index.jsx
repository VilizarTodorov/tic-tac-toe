import React from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { HOME } from "../../constants/routes";
import "./styles.css";

const INITIAL_STATE = {
  email: "",
  password: "",
  repeatPassword: "",
  error: "",
};

class BaseSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    const { email, password } = this.state;
    this.props.firebase
      .createUserWithEmail(email, password)
      .then((user) => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.replace(HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  render() {
    const { email, password, repeatPassword, error } = this.state;

    const isInvalid =
      password !== repeatPassword || password === "" || repeatPassword === "" || email === "" || password.length < 6;

    return (
      <div className="App-sign-up">
        <h1>Sign Up</h1>
        <form onSubmit={this.onSubmit}>
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
            name="password"
            className="password-input form-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={this.onChange}
            required
          />
          <input
            id="repeatPassword"
            name="repeatPassword"
            className="repeatPassword-input form-input"
            type="password"
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={this.onChange}
            required
          />

          <button disabled={isInvalid} type="submit">
            Sign Up
          </button>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

const SignUp = compose(withRouter, withFirebase)(BaseSignUp);

export default SignUp;
