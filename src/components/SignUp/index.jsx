import React from 'react'
import SignUpFrom from "./sign-up-form";
import SignUpLink from "./sign-up-link";
import {SignInLink} from '../SignIn'
import "./styles.css";

const SignUpPage = (props) => {
  return(
    <div className='App-sign-up-page'>
      <SignUpFrom></SignUpFrom>
      <SignInLink></SignInLink>
    </div>
  )
}

export default SignUpPage
export {SignUpLink}