import React from "react";
import SignOut from "../SignOut";
import { withAuthorization } from "../Session";
import { ChangePasswordLink } from "../ChangePassword";

const INITIAL_STATE = {
  username: "",
  wins: 0,
  draws: 0,
  losses: 0,
  points: 0,
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.props.firebase.getUserEntry(this.props.user.uid).then((user) => this.setState({ ...user.data() }));
  }

  render() {
    const { username, wins, draws, losses, points } = this.state;
    return (
      <div className="App-profile-page App-page">
        <div className="page-content">
          <h1>Profile Information</h1>
          <p>{username}</p>
          <p>{`Wins: ${wins}`}</p>
          <p>{`Draws: ${draws}`}</p>
          <p>{`Losses: ${losses}`}</p>
          <p>{`Points: ${points}`}</p>
          <ChangePasswordLink></ChangePasswordLink>
          <SignOut></SignOut>
        </div>
      </div>
    );
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Profile);
