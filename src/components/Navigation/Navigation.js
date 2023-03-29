import React from "react";

import "./Navigation.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <Link to="/" className="nav-p">
        Home
      </Link>
      <Link to="/about" className="nav-p">
        About
      </Link>
      <Link to="/login" className="nav-p">
        Sign In
      </Link>
      <Link to="signup" className="nav-p">
        Sign Up
      </Link>
    </nav>
  );
};

export default Navigation;
