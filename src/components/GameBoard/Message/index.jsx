import React from "react";
import { animated, config, useSpring } from "react-spring";

import "./styles.scss";

const Message = (props) => {
  const message = useSpring({
    from: { transform: "scale(0)" },
    to: { transform: "scale(1)" },
    config: { ...config.wobbly },
    delay: 300,
  });

  return (
    <animated.div style={message}>
      <div className={`message ${props.message === "X’s Turn" || props.message === "O WINS" ? "yes" : "no"}`}>
        <p>{props.message}</p>
      </div>
    </animated.div>
  );
};

export default Message;
