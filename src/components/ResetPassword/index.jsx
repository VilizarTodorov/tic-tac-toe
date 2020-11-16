import React from "react";
import ResetPasswordLink from "./reset-password-link";
import ResetPasswordForm from "./reset-password-form";
const ResetPassword = (props) => {
  return (
    <div className="App-reset-password-page App-page">
      <ResetPasswordForm></ResetPasswordForm>
    </div>
  );
};

export default ResetPassword;
export { ResetPasswordLink };
