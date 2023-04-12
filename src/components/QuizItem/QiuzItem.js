import React from "react";

import "./QuizItem.css";
import "../../containers/App.css";
import { useContext } from "react";
import DataContext from "../../context/DataProvider";

const QuizItem = () => {
  const { category, quizItems, currentItemIndex } = useContext(DataContext);
  const item = quizItems[currentItemIndex];

  let content = "";
  switch (category) {
    case "frame":
      content = (
        <img classname="frame" alt="movie" src={item.image} height="350" />
      );
      break;
    case "description":
      content = <p className="description">{item.description}</p>;
      break;
    default:
      content = <p className="no-category">No category</p>;
      break;
  }

  return <div className="quiz-item">{content}</div>;
};

export default QuizItem;
