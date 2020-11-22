import React from "react";
import { useSpring, animated } from "react-spring";

const SymbolO = (props) => {
  const springProps = useSpring({
    to: { strokeDashoffset: 0 },
    from: { strokeDashoffset: 126 },
  });

  return (
    <animated.div style={springProps}>
      <svg
        className="o"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 60 60"
        style={{ enableBackground: "new 0 0 60 60" }}
        xmlSpace="preserve"
      >
        <circle className="o__line" cx="30" cy="30" r="20" />
      </svg>
    </animated.div>
  );
};

export default SymbolO;
