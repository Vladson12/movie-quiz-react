import React from "react";

import "./AnswerInfo.css";
import { useContext } from "react";
import DataContext from "../../context/DataProvider";

const AnswerInfo = () => {
  const { quizItems, currentItemIndex } = useContext(DataContext);
  const answer = quizItems[currentItemIndex].title;
  const releaseDate = quizItems[currentItemIndex].releaseDate;

  return <p className="answer-info--p">{`${answer} (${releaseDate})`}</p>;
};

export default AnswerInfo;
