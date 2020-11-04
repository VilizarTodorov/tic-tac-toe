import React from "react";
import GameBoard from "../GameBoard";
import InitialGameBoardScreen from "../InitialGameBoardScreen";
import { config, Spring, Transition } from "react-spring/renderprops";
import "./styles.css";

const INITIAL_STATE = {
  isPlaying: false,
  component: []
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount(){
    this.setState({component:<InitialGameBoardScreen startGame={this.startGame}></InitialGameBoardScreen>})
  }

  startGame = () => {
    this.setState({component:[]},() => setTimeout(() => this.setState({component:<GameBoard></GameBoard>}),700));
  };

  render() {
    const { component } = this.state;

    return (
      <div className="game">
        <Transition
          items={component}
          from={{
            transform: "rotateX(45deg) rotateY(90deg)",
            height: "400px",
            position: "absolute",
            width: "400px",
          }}
          enter={{ transform: "rotateX(0deg) rotateY(0)" }}
          leave={{ transform: "rotateX(45deg) rotateY(90deg)" }}
          config={{ ...config.wobbly,duration:700 }}
        >
          {(component) => (props) => <div style = {props}>{component}</div>}
        </Transition>
      </div>
    );
  }
}

export default Game;

{
  /* <Transition
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
</Transition> */
}
