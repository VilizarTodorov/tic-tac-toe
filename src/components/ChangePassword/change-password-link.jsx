import React from "react";
import { Link } from "react-router-dom";
import { CHANGE_PASSWORD } from "../../constants/routes";

const ChangePasswordLink = (props) => {
  return (
    <div>
      <Link to={CHANGE_PASSWORD}>CHANGE PASSWORD</Link>
    </div>
  );
};
export default ChangePasswordLink;
