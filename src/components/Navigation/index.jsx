import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import "./styles.css";

const INITIAL_STATE = {
  isOpen: false,
};

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  showElement = (event) => {
    this.setState({ isOpen: true }, () => console.log(this.state));
    document.getElementById("root").addEventListener("click", this.hideElement);
  };

  hideElement = (event) => {
    if (event.target.id !== "searchValue") {
      this.setState({ isOpen: false }, () => console.log(this.state));
      document.getElementById("root").removeEventListener("click", this.hideElement);
    }
  };

  componentWillUnmount() {
    document.removeEventListener("click", this.hideElement);
  }

  render() {
    const { isOpen } = this.state;

    return (
      <Fragment>
        <ul className={`App-navigation ${isOpen ? "dropped" : ""}`}>
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

        <i onClick={this.showElement} className="menu-icon fas fa-bars fa-lg"></i>
      </Fragment>
    );
  }
}

export default Navigation;
