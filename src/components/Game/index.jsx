import React from "react";
import GameBoard from "../GameBoard";
import InitialGameBoardScreen from "../InitialGameBoardScreen";
import { config, Spring, Transition } from "react-spring/renderprops";
import "./styles.css";

const INITIAL_STATE = {
  isPlaying: false,
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  startGame = () => {
    this.setState((state) => ({
      isPlaying: !state.isPlaying,
    }));
  };

  render() {
    return (
      <div className="game">
        <Transition
          items={this.state.isPlaying}
          from={{ transform: "rotateX(45deg) rotateY(90deg)", height: "400px" }}
          enter={{ transform: "rotateX(0deg) rotateY(0)" }}
          leave={{ background:'white' }}
        >
          {(isPlaying) =>
            isPlaying
              ? (props) => <div style={props}>{<GameBoard></GameBoard>}</div>
              : (props) => (
                  <div style={props}>
                    <InitialGameBoardScreen startGame={this.startGame}></InitialGameBoardScreen>
                  </div>
                )
          }
        </Transition>
      </div>
    );
  }
}

export default Game;
