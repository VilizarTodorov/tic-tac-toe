import React from "react";
import { ChangePasswordLink } from "../../ChangePassword";
import SignOut from "../../SignOut";
import ErrorPopUpMessage from '../../ErrorPopUpMessage'

const ProfileView = (props) => {
  return (
    <div className="App-profile-page App-page">
      <div className="App-profile page-content">
        <h1 className='page-title'>Profile Information</h1>
        <p>{props.username}</p>
        <p>{`Wins: ${props.wins}`}</p>
        <p>{`Losses: ${props.losses}`}</p>
        <p>{`Points: ${props.points}`}</p>
        <ChangePasswordLink></ChangePasswordLink>
        <SignOut></SignOut>
        <ErrorPopUpMessage OK={props.OK} error={props.error}></ErrorPopUpMessage>
      </div>
    </div>
  );
};

export default ProfileView;
