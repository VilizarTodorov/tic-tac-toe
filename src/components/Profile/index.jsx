import React from "react";
import SignOut from "../SignOut";
import { withAuthorization } from "../Session";
import { ChangePasswordLink } from "../ChangePassword";

const Profile = (props) => {
  return (
    <div className="profile">
      <ChangePasswordLink></ChangePasswordLink>
      <SignOut></SignOut>
    </div>
  );
};

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Profile);
