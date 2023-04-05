import React from "react";
import Tilt from "react-tilt";

import "./Logo.css";

const Logo = () => {
  return (
    <div className="logo">
      <Tilt className="Tilt" options={{ max: 35 }}>
        <div className="Tilt-inner">
          <img alt="logo" src="favicon.ico" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
