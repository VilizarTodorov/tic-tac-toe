import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";
const GoBackButton = (props) => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <button onClick={goBack} className="submit-button go-back-button">
      Go Back
    </button>
  );
};
export default GoBackButton;
