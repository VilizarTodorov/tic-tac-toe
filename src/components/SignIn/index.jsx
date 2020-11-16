import React from "react";
import SignInForm from "./sign-in-form";
import SignInLink from "./sign-in-link";
import { SignUpLink } from "../SignUp";
import { ResetPasswordLink } from "../ResetPassword";
import './styles.css'

const SignInPage = (props) => {
  return (
    <div className="App-sign-in-page App-page">
      <SignInForm></SignInForm>
      <ResetPasswordLink></ResetPasswordLink>
      <SignUpLink></SignUpLink>
    </div>
  );
};

export default SignInPage;
export { SignInLink };
