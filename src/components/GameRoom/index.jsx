// import React from "react";
// // import { withAuthorization } from "../Session";
// // import { HOME } from "../../constants/routes";
// import GameBoard from "../GameBoard";
// // import InitialGameBoardScreen from "../InitialGameBoardScreen";
// // import { config, Transition } from "react-spring/renderprops";
// import "./styles.css";

// // const INITIAL_STATE = {
// //   board: [null, null, null, null, null, null, null, null, null],
// // };

// class GameRoom extends React.Component {
//   constructor(props) {
//     super(props);
//     // this.state = { ...INITIAL_STATE };
//   }

  // componentDidMount() {
  //   // this.setState({ component: <InitialGameBoardScreen startGame={this.startGame}></InitialGameBoardScreen> });
  //   const roomID = this.props.match.params.room;
  //   this.listener = this.props.firebase.getRoomEntry(roomID).onSnapshot((doc) => {
  //     if (doc.data()) {
  //       this.setState({
  //         ...doc.data(),
  //       });
  //     } else {
  //       this.props.history.replace(HOME);
  //     }
  //   });
  // }

  // componentWillUnmount() {
  //   this.listener();
  // }

  // performPlayerTurn = (index) => {
  //   // if (!this.state.isGameDone) {
  //     const newBoard = [...this.state.board];
  //     newBoard[index] = this.state.currentPlayer;

  //     this.setState((state, props) => ({
  //       boardSpaces: newBoard,
  //       currentPlayer: state.currentPlayer === "x" ? "o" : "x",
  //     }));
  //   // }
  // };

  // startGame = () => {
  //   this.setState({ component: [] }, () =>
  //     setTimeout(() => this.setState({ component: <GameBoard></GameBoard> }), 250)
  //   );
  // };

//   render() {
//     console.log(this.props.user);
//     console.log(this.state);
//     // const { component } = this.state;

//     return (
//       <div className="game">
//         {/* <Transition
//           items={component}
//           from={{
//             transform: "rotateY(90deg) rotateX(90deg)",
//             height: "100%",
//             position: "absolute",
//             width: "100%",
//           }}
//           enter={{ transform: "rotateY(0deg) rotateX(0)" }}
//           leave={{ transform: "rotateY(90deg) rotateX(-90deg)" }}
//           // config={{ duration: 250 }}
//           config={{ ...config.wobbly }}
//         >
//           {(component) => (props) => <div style={props}>{component}</div>}
//         </Transition> */}
//         <GameBoard {...this.state} performPlayerTurn={this.performPlayerTurn}></GameBoard>
//       </div>
//     );
//   }
// }

// const condition = (authUser) => authUser != null;

// export default withAuthorization(condition)(GameRoom);
