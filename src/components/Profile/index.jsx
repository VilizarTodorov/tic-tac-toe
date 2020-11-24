import React from "react";
import { withAuthorization } from "../Session";
import { makeCancelable } from "../../utils/functions";
import ProfileView from "./ProfileDummyComponent/profile-view";
import "./styles.scss";

const INITIAL_STATE = {
  username: "",
  wins: 0,
  draws: 0,
  losses: 0,
  points: 0,
  isFetching: true,
  error: null,
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.cancelable = makeCancelable(this.props.firebase.getUserEntry(this.props.user.uid));

    this.cancelable.promise
      .then((user) => this.setState({ ...user.data(), isFetching: false }))
      .catch((error) => this.setState({ error, isFetching: false }));
  }

  componentWillUnmount() {
    this.cancelable.cancel();
  }

  render() {
    const { username, wins, losses, points } = this.state;
    return <ProfileView username={username} wins={wins} losses={losses} points={points}></ProfileView>;
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Profile);
