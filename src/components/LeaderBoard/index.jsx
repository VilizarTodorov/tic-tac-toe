import React from "react";
import { withAuthorization } from "../Session";
import LeaderBoardView from "./LeaderBoardDummyComponent/leader-board-view";
import { makeCancelable } from "../../utils/functions";
import "./styles.scss";

const INITIAL_STATE = {
  users: [],
  isFetching: true,
};

class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    const users = [];

    this.cancelable = makeCancelable(this.props.firebase.getTop10Users());

    this.cancelable.promise
      .then((snapshot) => {
        snapshot.forEach((doc) => users.push(doc.data()));
      })
      .then(() => this.setState({ users, isFetching: false }))
      .catch((error) => this.setState({ error, isFetching: false }));
  }

  componentWillUnmount() {
    this.cancelable.cancel();
  }

  render() {
    const { users } = this.state;

    return <LeaderBoardView users={users}></LeaderBoardView>;
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(LeaderBoard);
