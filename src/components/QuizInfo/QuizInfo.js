import React, { useContext } from "react";
import "./QuizInfo.css";
import Timer from "../Timer/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Phase } from "../../util/quizPhase";
import DataContext from "../../context/DataProvider";

const message = (rate) => {
  if (rate >= 0.99) return "You're genius!🧓🎓🎉👍";
  if (rate >= 0.9) return "You're excellent!😲";
  if (rate >= 0.75) return "OK, you're pretty good.😉";
  if (rate >= 0.5)
    return "Not too bad. Far from a movie professional, though.😐";
  if (rate >= 0.3) return "Well, I was expecting more...👎";
  return "You don't seem to watch movies...💩";
};

const QuizInfo = () => {
  const {
    quizTime,
    setQuizTime,
    onTimerExpired,
    size,
    correctAnswers,
    quizPhase,
  } = useContext(DataContext);

  const minutes = Math.floor(quizTime / 60);
  const seconds = Math.floor(quizTime % 60);

  return (
    <div className="quiz-info">
      {quizPhase === Phase.FINISHED ? (
        <p className="quiz-info__timer">
          <FontAwesomeIcon icon={faClock} />{" "}
          {`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
        </p>
      ) : (
        <Timer
          time={quizTime}
          setTime={setQuizTime}
          onExpired={onTimerExpired}
        />
      )}
      <p className="quiz-info__score">
        Score: {correctAnswers}/{size}
      </p>
      {quizPhase === Phase.FINISHED && (
        <p className="quiz-info__message">{message(correctAnswers / size)}</p>
      )}
    </div>
  );
};

export default QuizInfo;
