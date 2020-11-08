import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const SignInLink = (props) => {
  return (
    <p className='sign-in-link'>
      Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </p>
  );
};

export default SignInLink;