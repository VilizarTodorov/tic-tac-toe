import React from "react";
import { HOME, ROOMS } from "../../constants/routes";
import { withAuthorization } from "../Session";
import ErrorPopUpMessage from "../ErrorPopUpMessage";
import "./styles.scss";

const INITIAL_STATE = {
  hasChosenX: false,
  hasChosenO: false,
  isOFree: false,
  isXFree: false,
  isUpdating: true,
  error: null,
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
          this.props.history.replace(ROOMS);
        }

        if (guest === "" && this.props.user.uid !== owner) {
          this.props.firebase.updateRoomEntry(roomID, { guest: this.props.user.uid });
        }

        this.setState(
          {
            ...doc.data(),
          },
          () => {
            if (this.state.X === "empty") {
              this.setState({ isXFree: true });
            }

            if (this.state.O === "empty") {
              this.setState({ isOFree: true });
            }

            if (this.state.X !== "empty" && this.state.X === this.props.user.uid) {
              this.setState({ hasChosenX: true });
            }

            if (this.state.O !== "empty" && this.state.O === this.props.user.uid) {
              this.setState({ hasChosenO: true });
            }

            this.setState({ isUpdating: false });

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

  OK = () => {
    this.setState({ error: null });
  };

  getRoomID = () => {
    return this.props.match.params.room;
  };

  chooseX = () => {
    if (this.state.isUpdating) {
      this.setState({ error : { message: "Please wait a few seconds UwU" } });
      return;
    }

    if (this.state.hasChosenO) {
      this.setState({ error : { message: "You have already chosen O" } });
      return;
    }

    if (this.state.hasChosenX) {
      this.setState({ error : { message: "You have already chosen X" } });
      return;
    }

    if (!this.state.isXFree) {
      this.setState({ error : { message: "X is taken" } });
      return;
    }

    this.choose("X");
  };

  chooseO = () => {
    if (this.state.isUpdating) {
      this.setState({ error : { message: "Please wait a few seconds UwU" } });
      return;
    }

    if (this.state.hasChosenX) {
      this.setState({ error : { message: "You have already chosen X" } });
      return;
    }

    if (this.state.hasChosenO) {
      this.setState({ error : { message: "You have already chosen O" } });
      return;
    }

    if (!this.state.isOFree) {
      this.setState({ error : { message: "O is taken" } });
      return;
    }

    this.choose("O");
  };

  choose = (symbol) => {
    this.setState({ isUpdating: true }, () => {
      const roomID = this.getRoomID();
      const docRef = this.props.firebase.getRoomEntry(roomID);

      this.props.firebase.createTransaction(this.updateFunction, docRef, symbol).catch((error) => {
        this.setState({ error, isUpdating: false });
      });
    });
  };

  updateFunction = (transaction, docRef, symbol) => {
    return transaction.get(docRef).then((doc) => {
      if (!doc.exists) {
        throw Error("Document doest exist");
      }

      const isSymbolTaken = doc.data()[symbol];
      if (isSymbolTaken === "empty") {
        transaction.update(docRef, { [symbol]: this.props.user.uid });
      } else {
        return Promise.reject(`Sorry ${symbol} is taken`);
      }
    });
  };

  render() {
    const { hasChosenX, hasChosenO, error } = this.state;

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
        <ErrorPopUpMessage OK={this.OK} error={error}></ErrorPopUpMessage>
      </div>
    );
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(InitialGameBoardScreen);
