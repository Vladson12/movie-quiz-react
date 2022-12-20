import React from "react";
import Tilt from "react-tilt";

import "./Logo.css";
import logo from "./logo.png";

const Logo = () => {
  return (
    <div>
      <Tilt
        className="Tilt"
        options={{ max: 55 }}
        style={{ height: 100, width: 100 }}
      >
        <div className="Tilt-inner">
          <img style={{ paddingTop: "5px" }} alt="logo" src={logo} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
