import React from "react";
import { HOME, ROOMS } from "../../constants/routes";
import { withAuthorization } from "../Session";
import "./styles.css";

const INITIAL_STATE = {
  hasChosenX: false,
  hasChosenO: false,
};

class InitialGameBoardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    const roomID = this.getRoomID();
    this.listener = this.props.firebase.getRoomEntry(roomID).onSnapshot((doc) => {
      if (doc.data()) {
        const { owner, guest } = doc.data();

        if (guest !== "" && guest !== this.props.user.uid && this.props.user.uid !== owner) {
          debugger;
          this.props.history.replace(ROOMS);
        }

        if (guest === "" && this.props.user.uid !== owner) {
          debugger;
          this.props.firebase.updateRoomEntry(roomID, { guest: this.props.user.uid });
        }

        this.setState(
          {
            ...doc.data(),
          },
          () => {
            if (this.state.X !== "empty" && this.state.X === this.props.user.uid) {
              this.setState({ hasChosenX: true });
            }

            if (this.state.O !== "empty" && this.state.O === this.props.user.uid) {
              this.setState({ hasChosenO: true });
            }

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
    if (this.state.hasChosenO) {
      alert("You already chose O");
      return;
    }

    if (this.state.X !== "empty" && this.state.hasChosenX === false) {
      alert("X is already taken");
      return;
    }

    if (this.state.X !== "empty" && this.state.hasChosenX) {
      alert("You have already chosen X");
      return;
    }

    const roomID = this.getRoomID();
    this.props.firebase.updateRoomEntry(roomID, {
      X: this.props.user.uid,
    });
  };

  chooseO = () => {
    if (this.state.hasChosenX) {
      alert("You already chose X");
      return;
    }

    if (this.state.O !== "empty" && this.state.hasChosenO === false) {
      alert("O is already taken");
      return;
    }

    if (this.state.O !== "empty" && this.state.hasChosenO) {
      alert("You have already chosen X");
      return;
    }

    const roomID = this.getRoomID();
    this.props.firebase.updateRoomEntry(roomID, {
      O: this.props.user.uid,
    });
  };

  render() {
    const { hasChosenX, hasChosenO } = this.state;

    return (
      <div className="component-container">
        <div className="initial-board">
          <div className="svg-container">
            <svg
              onClick={this.chooseX}
              className={`x ${hasChosenX ? "chosen" : ""}`}
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
          <div className="svg-container">
            <svg
              onClick={this.chooseO}
              className={`o ${hasChosenO ? "chosen" : ""}`}
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
      </div>
    );
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(InitialGameBoardScreen);
