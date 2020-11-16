import React from "react";
import { Link } from "react-router-dom";
import { RESET_PASSWORD } from "../../constants/routes";

const ResetPasswordLink = () => {
  return (
    <div>
      <Link to={RESET_PASSWORD}>Forgot your Password ?</Link>
    </div>
  );
};

export default ResetPasswordLink;
