import React from "react";

import "./QuizItem.css";
import "../../containers/App.css";

const QuizItem = ({ category, item }) => {
  let element = "";
  if (category === "frame") {
    element = (
      <img classname="frame" alt="movie" src={`${item.image}`} height="400" />
    );
  } else if (category === "description") {
    element = <p className="description">{item.description}</p>;
  }
  return <div className="center">{element}</div>;
};

export default QuizItem;
