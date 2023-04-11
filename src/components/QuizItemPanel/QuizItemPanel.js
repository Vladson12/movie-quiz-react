import React, { useContext } from "react";

import QuizItemNumberButton from "./QuizItemNumberButton";
import "./QuizItemPanel.css";
import DataContext from "../../context/DataProvider";
import { Phase } from "../../util/quizPhase";

const QuizItemPanel = () => {
  const { quizPhase, currentItemIndex, onQuizItemPanelButtonClick, quizItems } =
    useContext(DataContext);

  const itemButtons = [];

  for (let i = 1; i <= quizItems.length; i++) {
    itemButtons.push(
      <QuizItemNumberButton
        wrong={quizPhase === Phase.FINISHED}
        key={i}
        active={currentItemIndex + 1 === i}
        number={i}
        onClick={onQuizItemPanelButtonClick}
        item={quizItems[i - 1]}
      />
    );
  }

  return <main className="quiz-item-panel">{itemButtons}</main>;
};

export default QuizItemPanel;
