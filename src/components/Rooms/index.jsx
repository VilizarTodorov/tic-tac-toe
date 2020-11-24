import React, { Fragment } from "react";
import { withAuthorization } from "../Session";
import { makeCancelable } from "../../utils/functions";
import RoomsView from "./RoomsDummyComponent/rooms-view";
import { ERROR_MESSAGE } from "../../constants/messages";
import "./styles.scss";

const INITIAL_STATE = {
  rooms: [],
  error: null,
  isFetching: true,
};

class Rooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    const rooms = [];

    this.cancelable = makeCancelable(this.props.firebase.getAllRooms());

    this.cancelable.promise
      .then((snapshot) => {
        snapshot.forEach((doc) => rooms.push({ ...doc.data(), id: doc.id }));
      })
      .then(() => this.setState({ rooms, isFetching: false }))
      .catch((error) => this.setState({ error, isFetching: false }));
  }

  componentWillUnmount() {
    this.cancelable.cancel();
  }

  render() {
    const { rooms, isFetching, error } = this.state;

    return (
      <Fragment>
        {isFetching ? <p>...Loading</p> : <RoomsView rooms={rooms}></RoomsView>}
        {error && alert(ERROR_MESSAGE)}
      </Fragment>
    );
  }
}

// const Rooms = (props) => {
//   const [rooms, setRooms] = useState([]);
//   const [isFetching, setIsFetching] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let cancelable = makeCancelable(props.firebase.getAllRooms());

//     async function fetchData() {
//       try {
//         await cancelable.promise
//           .then((snapshot) => {
//             const collection = [];
//             snapshot.forEach((doc) => {
//               collection.push({ ...doc.data(), id: doc.id });
//             });
//             return collection;
//           })
//           .then((collection) => setRooms(collection));
//       } catch (err) {
//         setError(err);
//       } finally {
//         setIsFetching(false);
//       }
//     }

//     fetchData();

//     return function cleanUp() {
//       cancelable.cancel();
//     };
//   }, [props.firebase]);

//   return (
//     <Fragment>
//       {isFetching ? <p>...Loading</p> : <RoomsView rooms={rooms}></RoomsView>}
//       {error && alert(ERROR_MESSAGE)}
//     </Fragment>
//   );
// };

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Rooms);
