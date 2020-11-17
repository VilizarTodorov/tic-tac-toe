import React from "react";
import { HOME } from "../../constants/routes";
import { withAuthorization } from "../Session";
import "./styles.css";

class InitialGameBoardScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const roomID = this.getRoomID();
    this.listener = this.props.firebase.getRoomEntry(roomID).onSnapshot((doc) => {
      if (doc.data()) {
        this.setState(
          {
            ...doc.data(),
          },
          () => {
            if (this.state.X !== "empty" && this.state.O !== "empty") {
              this.props.startGame();
            }
          }
        );
      } else {
        this.props.history.replace(HOME);
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  getRoomID = () => {
    return this.props.match.params.room;
  };

  chooseX = () => {
    if (this.state.X === this.props.user.uid || this.state.O === this.props.user.uid) {
      return;
    }

    const roomID = this.getRoomID();
    this.props.firebase.updateRoomEntry(roomID, {
      X: this.props.user.uid,
    });
  };

  chooseO = () => {
    if (this.state.X === this.props.user.uid || this.state.O === this.props.user.uid) {
      return;
    }

    const roomID = this.getRoomID();
    this.props.firebase.updateRoomEntry(roomID, {
      O: this.props.user.uid,
    });
  };

  render() {
    return (
      <div className="initial-board">
        <div onClick={this.chooseX} className="container">
          <svg
            className="x"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 51.6 51.6"
            style={{ enableBackground: "new 0 0 51.6 51.6" }}
            xmlSpace="preserve"
          >
            <line className="x__line x__line-2" x1="10.4" y1="10" x2="41.2" y2="41.6" />
            <line className="x__line x__line-1" x1="41.6" y1="10.4" x2="10" y2="41.2" />
          </svg>
        </div>
        <div className="container" onClick={this.chooseO}>
          <svg
            className="o"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 60 60"
            style={{ enableBackground: "new 0 0 60 60" }}
            xmlSpace="preserve"
          >
            <circle className="o__line" cx="30" cy="30" r="20" />
          </svg>
        </div>
      </div>
    );
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(InitialGameBoardScreen);
