import React from "react";

import "./AnswerForm.css";

const AnswerForm = ({ answer, language, onClick, onChange }) => {
  return (
    <form onSubmit={onClick} className="answer-form center">
      <input
        type="text"
        className="answer-form--input"
        id="input"
        placeholder={"Enter movie title"}
        value={answer}
        onChange={onChange}
        required
      />
      <button type="submit" className="answer-form--button">
        {"Answer"}
      </button>
    </form>
  );
};

export default AnswerForm;
