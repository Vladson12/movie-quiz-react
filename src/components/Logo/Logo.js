import React from "react";
import Tilt from "react-tilt";

import "./Logo.css";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div className="logo" onClick={() => navigate("/")}>
      <Tilt className="Tilt" options={{ max: 35 }}>
        <div className="Tilt-inner">
          <img alt="logo" src="favicon.ico" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
