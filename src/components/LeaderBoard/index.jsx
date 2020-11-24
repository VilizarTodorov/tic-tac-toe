import React, { Fragment } from "react";
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
    const { users, isFetching } = this.state;

    return <Fragment>{isFetching ? <p>...Loading</p> : <LeaderBoardView users={users}></LeaderBoardView>}</Fragment>;
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(LeaderBoard);
