import React from "react";
import { Spring } from "react-spring/renderprops";

const SymbolX = () => {
  return (
    <Spring from={{ x: 45 }} to={{ x: 0 }} config={{ duration: 200 }}>
      {(firstProps) => (
        <div>
          <Spring from={{ y: 45 }} to={{ y: 0 }} delay={200}>
            {(secondProps) => (
              <svg
                className="x"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 51.6 51.6"
                style={{ enableBackground: "new 0 0 51.6 51.6" }}
                xmlSpace="preserve"
              >
                <line
                  className="x__line x__line-2"
                  x1="10.4"
                  y1="10"
                  x2="41.2"
                  y2="41.6"
                  strokeDashoffset={firstProps.x}
                />
                <line
                  className="x__line x__line-1"
                  x1="41.6"
                  y1="10.4"
                  x2="10"
                  y2="41.2"
                  strokeDashoffset={secondProps.y}
                />
              </svg>
            )}
          </Spring>
        </div>
      )}
    </Spring>
  );
};

export default SymbolX;
