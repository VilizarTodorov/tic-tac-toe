import React from "react";

const SignUpFormView = (props) => {
  return (
    <div className="App-sign-up page-content">
      <h1>Sign Up</h1>
      <form className="sign-up-form page-form" onSubmit={props.onSubmit}>
        <input
          id="email"
          name="email"
          className="email-input form-input"
          type="email"
          placeholder="Email Address"
          value={props.email}
          onChange={props.onChange}
          required
        />

        <input
          id="username"
          name="username"
          className="username-input form-input"
          type="text"
          placeholder="Username"
          value={props.username}
          onChange={props.onChange}
          required
        />

        <input
          id="password"
          name="password"
          className="password-input form-input"
          type="password"
          placeholder="Password"
          value={props.password}
          onChange={props.onChange}
          required
        />
        <input
          id="repeatPassword"
          name="repeatPassword"
          className="repeatPassword-input form-input"
          type="password"
          placeholder="Repeat Password"
          value={props.repeatPassword}
          onChange={props.onChange}
          required
        />

        <button
          disabled={props.isInvalid}
          className={`submit-button ${props.isInvalid ? "disabled" : ""}`}
          type="submit"
        >
          Sign Up
        </button>

        {props.error && <p>{props.error.message}</p>}
      </form>
    </div>
  );
};

export default SignUpFormView;
