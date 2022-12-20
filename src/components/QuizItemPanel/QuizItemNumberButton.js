import React from "react";

import "./QuizItemPanelButton.css";

const QuizItemNumberButton = ({ wrong, active, number, onClick, item }) => {
  let className = "quiz-item-panel--button";
  if (item.isAnswered) className += " success";
  if (active) className += " active";
  if (wrong && !item.isAnswered) {
    className += " wrong";
  }

  return (
    <button onClick={onClick} className={className}>
      {number}
    </button>
  );
};

export default QuizItemNumberButton;
