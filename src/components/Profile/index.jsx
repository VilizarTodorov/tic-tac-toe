import React from "react";
import { withAuthorization } from "../Session";
import ProfileView from "./ProfileDummyComponent/profile-view";
import "./styles.scss";

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
    const { username, wins, losses, points } = this.state;
    return <ProfileView username={username} wins={wins} losses={losses} points={points}></ProfileView>;
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Profile);
