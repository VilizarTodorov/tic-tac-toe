import React from "react";
import GameBoard from "../GameBoard";
import InitialGameBoardScreen from "../InitialGameBoardScreen";
import { config, Spring, Transition } from "react-spring/renderprops";
import "./styles.css";

const INITIAL_STATE = {
  isPlaying: false,
  component: [],
};

class Game extends React.Component {
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
            height: "400px",
            position: "absolute",
            width: "400px",
          }}
          enter={{ transform: "rotateY(0deg) rotateX(0)" }}
          leave={{ transform: "rotateY(90deg) rotateX(-90deg)" }}
          config={{ duration: 250}}
        >
          {(component) => (props) => <div style={props}>{component}</div>}
        </Transition>
      </div>
    );
  }
}

export default Game;
