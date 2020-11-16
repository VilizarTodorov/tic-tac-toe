import React from "react";
import { Link } from "react-router-dom";
import { RESET_PASSWORD } from "../../constants/routes";

const ResetPasswordLink = () => {
  return (
    <p className="password-reset-link form-link">
      Forgot your password? <Link to={RESET_PASSWORD}>Click Here</Link>
    </p>
  );
};

export default ResetPasswordLink;
