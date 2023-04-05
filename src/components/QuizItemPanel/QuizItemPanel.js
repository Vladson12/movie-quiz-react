import React from "react";

import QuizItemNumberButton from "./QuizItemNumberButton";
import "./QuizItemPanel.css";

const QuizItemPanel = ({ paintWrong, items, active, onClick }) => {
  const itemButtons = [];
  for (let i = 1; i <= items.length; i++) {
    itemButtons.push(
      <QuizItemNumberButton
        wrong={paintWrong}
        key={i}
        active={active === i ? true : false}
        number={i}
        onClick={onClick}
        item={items[i - 1]}
      />
    );
  }
  return <main className="quiz-item-panel">{itemButtons}</main>;
};

export default QuizItemPanel;
