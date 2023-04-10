import React from "react";
import "./PlayQuiz.css";
import { useNavigate } from "react-router-dom";

const PlayQuiz = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("quiz");
  };

  return (
    <div className="playguiz-section">
      <button className="playquiz-section__button" onClick={onClick}>
        Play quiz
      </button>
    </div>
  );
};

export default PlayQuiz;
