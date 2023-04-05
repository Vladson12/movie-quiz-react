import React from "react";

import "./QuizItem.css";
import "../../containers/App.css";

const QuizItem = ({ category, item }) => {
  console.log(item.image);
  let element = "";
  if (category === "frame") {
    element = (
      <img
        classname="frame"
        alt="movie"
        src={`/frames/${item.image}`}
        height="350"
      />
    );
  } else if (category === "description") {
    element = <p className="description">{item.description}</p>;
  }
  return <div className="center">{element}</div>;
};

export default QuizItem;
