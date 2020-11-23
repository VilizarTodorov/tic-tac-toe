import React from "react";
import { withAuthorization } from "../Session";
import LeaderBoardView from "./LeaderBoardDummyComponent/leader-board-view";
import "./styles.scss";

const INITIAL_STATE = {
  users: [],
};

class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    const users = [];
    this.props.firebase
      .getTop10Users()
      .then((snapshot) => {
        snapshot.forEach((doc) => users.push(doc.data()));
      })
      .then(() => this.setState({ users }))
      .catch((error) => console.log(error));
  }

  render() {
    const { users } = this.state;

    return <LeaderBoardView users={users}></LeaderBoardView>;
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(LeaderBoard);
