import React from "react";

import "./AnswerInfo.css";

const AnswerInfo = ({ answer, releaseDate }) => {
  return <p className="answer-info--p">{`${answer} (${releaseDate})`}</p>;
};

export default AnswerInfo;
