import React from "react";
import SignInForm from "./sign-in-form";
import SignInLink from "./sign-in-link";
import { SignUpLink } from "../SignUp";

const SignInPage = (props) => {
  return (
    <div className="App-sign-in-page App-page">
      <SignInForm></SignInForm>
      <SignUpLink></SignUpLink>
    </div>
  );
};

export default SignInPage;
export { SignInLink };
