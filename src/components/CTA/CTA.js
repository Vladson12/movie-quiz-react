import React from "react";
import "./CTA.css";
import { Link, useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <div className="cta">
      <p className="cta__p">{process.env.REACT_APP_CTA_MESSAGE}</p>
      <button className="cta__button" onClick={() => navigate("/signup")}>
        Sign up
      </button>
      <Link to="login" className="cta__link">
        Already have an account? Sign in
      </Link>
    </div>
  );
};

export default CTA;
