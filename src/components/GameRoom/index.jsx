import React from "react";
import { withAuthorization } from "../Session";
import GameBoard from "../GameBoard";
import InitialGameBoardScreen from "../InitialGameBoardScreen";
import { Transition } from "react-spring/renderprops";
import "./styles.css";

const INITIAL_STATE = {
  component: [],
};

class GameRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.setState({ component: <InitialGameBoardScreen startGame={this.startGame}></InitialGameBoardScreen> });
  }

  startGame = () => {
    this.setState({ component: [] }, () =>
      setTimeout(() => this.setState({ component: <GameBoard></GameBoard> }), 250)
    );
  };

  render() {
    const { component } = this.state;
    return (
      <div className="game">
        <Transition
          items={component}
          from={{
            transform: "rotateY(90deg) rotateX(90deg)",
            height: "100%",
            position: "absolute",
            width: "100%",
          }}
          enter={{ transform: "rotateY(0deg) rotateX(0)" }}
          leave={{ transform: "rotateY(90deg) rotateX(-90deg)" }}
          config={{ duration: 250 }}
        >
          {(component) => (props) => <div style={props}>{component}</div>}
        </Transition>
      </div>
    );
  }
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(GameRoom);
