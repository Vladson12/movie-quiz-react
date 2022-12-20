import React from "react";

import "./QuizResults.css";
import "../../containers/App.css";

const message = (rate) => {
  if (rate >= 0.99) return "You're genius!🧓🎓🎉👍";
  if (rate >= 0.9) return "You're excellent!😲";
  if (rate >= 0.75) return "OK, you're pretty good.😉";
  if (rate >= 0.5)
    return "Not too bad. Far from a movie professional, though.😐";
  if (rate >= 0.3) return "Well, I was expecting more...👎";
  return "You don't seem to watch movies...💩";
};

const QuizResults = ({ correct, total }) => {
  return (
    <div className="center">
      <h1 className="quiz-results--h1">
        {correct}/{total}
      </h1>
      <p className="quiz-results--p">{message(correct / total)}</p>
    </div>
  );
};

export default QuizResults;
