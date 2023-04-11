import React from "react";

import "./AnswerForm.css";
import { useContext } from "react";
import DataContext from "../../context/DataProvider";

const AnswerForm = () => {
  const {
    quizItems,
    currentItemIndex,
    onAnswerButtonClick,
    onAnswerInputChange,
  } = useContext(DataContext);
  const answer = quizItems[currentItemIndex].answer;

  return (
    <form onSubmit={onAnswerButtonClick} className="answer-form">
      <input
        type="text"
        className="answer-form--input"
        id="input"
        placeholder={"Enter movie title"}
        value={answer}
        onChange={onAnswerInputChange}
        required
      />
      <button type="submit" className="answer-form--button">
        {"Answer"}
      </button>
    </form>
  );
};

export default AnswerForm;
