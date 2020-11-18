import React from "react";
import "./styles.css";

const Message = (props) => {
  return (
    <div className="message">
      <p>{props.message}</p>
    </div>
  );
};

export default Message;
