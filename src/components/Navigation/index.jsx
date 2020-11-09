import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import SignOut from "../SignOut";

const Navigation = () => {
  return (
    <ul>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to='/rooms/room'>Game Room</Link>
      </li>
      <li>
        <Link to={ROUTES.ROOMS}>Rooms</Link>
      </li>
      <SignOut></SignOut>
    </ul>
  );
};

export default Navigation