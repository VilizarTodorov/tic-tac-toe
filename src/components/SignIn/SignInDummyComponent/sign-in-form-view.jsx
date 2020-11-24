import React from "react";

const SignInFormView = (props) => {
  return (
    <div className="App-sign-in page-content">
      <h1 className="page-title">Sign In</h1>
      <form className="sign-in-form page-form" onSubmit={props.onSubmit}>
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
          id="password"
          className="password-input form-input"
          name="password"
          type="password"
          placeholder="Password"
          value={props.password}
          onChange={props.onChange}
          required
        />

        <button
          disabled={props.isInvalid || props.isSigningIn}
          className={`submit-button ${props.isInvalid ? "disabled" : ""}`}
          type="submit"
        >
          Sign{props.isSigningIn ? "ing" : ""} In
        </button>
        {props.error && alert(props.error.message)}
      </form>
    </div>
  );
};

export default SignInFormView;
