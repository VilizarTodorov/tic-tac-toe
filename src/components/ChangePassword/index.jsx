import React from "react";
import ChangePasswordForm from "./change-password-form";
import ChangePasswordLink from "./change-password-link";
import { withAuthorization } from "../Session";
import "./styles.scss"

const ChangePassword = () => {
  return (
    <div className="App-change-password-page App-page">
      <ChangePasswordForm />
    </div>
  );
};

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(ChangePassword);
export { ChangePasswordForm, ChangePasswordLink };
