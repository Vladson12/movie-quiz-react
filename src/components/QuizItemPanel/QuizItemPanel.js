import React from "react";

import QuizItemNumberButton from "./QuizItemNumberButton";

const QuizItemPanel = ({ paintWrong, items, active, onClick }) => {
  const rows = [];
  for (let i = 1; i <= items.length; i++) {
    rows.push(
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
  return <div className="center">{rows}</div>;
};

export default QuizItemPanel;
