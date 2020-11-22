import React from "react";
import { ChangePasswordLink } from "../../ChangePassword";
import SignOut from "../../SignOut";

const ProfileView = (props) => {
  return (
    <div className="App-profile-page App-page">
      <div className="App-profile page-content">
        <h1>Profile Information</h1>
        <p>{props.username}</p>
        <p>{`Wins: ${props.wins}`}</p>
        <p>{`Draws: ${props.draws}`}</p>
        <p>{`Losses: ${props.losses}`}</p>
        <p>{`Points: ${props.points}`}</p>
        <ChangePasswordLink></ChangePasswordLink>
        <SignOut></SignOut>
      </div>
    </div>
  );
};

export default ProfileView;
