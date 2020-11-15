import React, { Fragment } from "react";
import SymbolX from "../SymbolX";
import SymbolO from "../SymbolO";
import "./styles.css";

const Logo = (props) => {
  return (
    <Fragment>
      <div className="symbol">
        <SymbolX></SymbolX>
      </div>
      <div className="symbol">
        <SymbolO></SymbolO>
      </div>
    </Fragment>
  );
};

export default Logo;
