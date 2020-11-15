import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import "./styles.css";

const Navigation = () => {
  return (
    <ul className="App-navigation">
      <li>
        <Link to={ROUTES.HOME}>
          <h1>Home</h1>
        </Link>
      </li>
      <li>
        <Link to={ROUTES.ROOMS}>
          <h1>Rooms</h1>
        </Link>
      </li>
      <li>
        <Link to={ROUTES.PROFILE}>
          <h1>Profile</h1>
        </Link>
      </li>
    </ul>
  );
};

export default Navigation;
