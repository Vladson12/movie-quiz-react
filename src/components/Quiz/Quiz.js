import React, { useContext } from "react";
import { Phase } from "../../util/quizPhase";
import Loading from "../Loading/Loading";
import QuizOptions from "../QuizOptions/QuizOptions";
import StartStopButton from "../StartStopButton/StartStopButton";
import QuizItemPanel from "../QuizItemPanel/QuizItemPanel";
import AnswerForm from "../AnswerForm/AnswerForm";
import AnswerInfo from "../AnswerInfo/AnswerInfo";
import QuizItem from "../QuizItem/QiuzItem";

import "./Quiz.css";
import QuizInfo from "../QuizInfo/QuizInfo";
import DataContext from "../../context/DataProvider";

const Quiz = () => {
  const { quizPhase, quizItems, currentItemIndex } = useContext(DataContext);

  return (
    <div className="quiz-section">
      {quizPhase === Phase.PREPARING && <Loading />}
      {[Phase.BEFORE_START, Phase.PREPARING].includes(quizPhase) && (
        <QuizOptions
          cards={[
            { name: "Frame", image: "/frames/godfather.jpg" },
            { name: "Description", image: "/frames/dark-knight.jpg" },
          ]}
        />
      )}
      <StartStopButton />
      {[Phase.RUNNING, Phase.FINISHED].includes(quizPhase) && <QuizInfo />}
      {[Phase.RUNNING, Phase.FINISHED].includes(quizPhase) && <QuizItemPanel />}
      {quizPhase === Phase.RUNNING &&
        !quizItems[currentItemIndex].isAnswered && <AnswerForm />}
      {(quizItems[currentItemIndex].isAnswered ||
        quizPhase === Phase.FINISHED) && <AnswerInfo />}
      {[Phase.RUNNING, Phase.FINISHED].includes(quizPhase) && <QuizItem />}
    </div>
  );
};

export default Quiz;
