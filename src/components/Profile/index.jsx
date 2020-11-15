import React from "react";
import SignOut from "../SignOut";
import { withAuthorization } from "../Session";

const Profile = (props) => {
  return (
    <div className="profile">
      <SignOut></SignOut>
    </div>
  );
};

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Profile);
