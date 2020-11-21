import React from "react";
import { withAuthorization } from "../Session";
import UserEntry from "./UserEntry";
import "./styles.css";

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

    const usersList = users.map((user, index) => {
      return (
        <li key={index}>
          <UserEntry username={user.username} wins={user.wins} losses={user.losses} points={user.points}></UserEntry>
        </li>
      );
    });

    return (
      <div className="App-leader-board-page App-page">
        <div className="page-content">
          <h1 className="page-title">Leader Board</h1>
          <ul className="leader-board">{usersList}</ul>
        </div>
      </div>
    );
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(LeaderBoard);
