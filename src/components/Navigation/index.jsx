import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import "./styles.css";

const Navigation = () => {
  return (
    <Fragment>
      <input type="checkbox" name="menu" id="menu" />

      <ul className="App-navigation">
        <li className="nav-option">
          <Link to={ROUTES.HOME}>
            <p>Home</p>
          </Link>
        </li>

        <li className="nav-option">
          <Link to={ROUTES.ROOMS}>
            <p>Rooms</p>
          </Link>
        </li>

        <li className="nav-option">
          <Link to={ROUTES.PROFILE}>
            <p>Profile</p>
          </Link>
        </li>

        <li className="nav-option">
          <Link to={ROUTES.SIGN_IN}>
            <p>SIGN_IN</p>
          </Link>
        </li>

        <li className="nav-option">
          <Link to={ROUTES.SIGN_UP}>
            <p>SIGN_UP</p>
          </Link>
        </li>
      </ul>

      <label className='menu-icon' htmlFor="menu">
        <i className="fas fa-bars fa-lg"></i>
      </label>
    </Fragment>
  );
};

export default Navigation;
