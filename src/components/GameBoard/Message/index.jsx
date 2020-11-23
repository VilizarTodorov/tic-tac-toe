import React from "react";
import "./styles.scss";

const Message = (props) => {
  return (
    <div className={`message ${props.message === "X’s Turn" || props.message === 'O WINS' ? 'yes':'no'}`}>
      <p>{props.message}</p>
    </div>
  );
};

export default Message;
