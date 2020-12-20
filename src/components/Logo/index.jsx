import React from "react";
import { Link } from "react-router-dom";
import { HOME } from "../../constants/routes";
import "./styles.scss";

const Logo = (props) => {
  return (
    <Link to={HOME}>
      <h2>Tic Tac Toe</h2>
    </Link>
  );
};

export default Logo;
