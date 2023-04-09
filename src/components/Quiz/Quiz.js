import React from "react";
import { useState } from "react";
import { Phase } from "../../util/quizPhase";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCircleStop,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import isAnswerCorrect from "../../util/isAnswerCorrect";
import Loading from "../Loading/Loading";
import { quizGreetingMessage } from "../../util/quizMessages";
import QuizResults from "../QuizResults/QuizResults";
import QuizOptions from "../QuizOptions/QuizOptions";
import StartStopButton from "../StartStopButton/StartStopButton";
import Timer from "../Timer/Timer";
import QuizItemPanel from "../QuizItemPanel/QuizItemPanel";
import AnswerForm from "../AnswerForm/AnswerForm";
import AnswerInfo from "../AnswerInfo/AnswerInfo";
import QuizItem from "../QuizItem/QiuzItem";
import fetchQuizData from "../../util/fetchQuizData";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const Quiz = () => {
  const [size, setSize] = useState(20);
  const [quizPhase, setQuizPhase] = useState(Phase.BEFORE_START);
  const [language, setLanguage] = useState("en");
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [quizItems, setQuizItems] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeForOneItem, setTimeForOneItem] = useState(15);
  const [quizTime, setQuizTime] = useState(0);
  const [category, setCategory] = useState("");
  const [startStopButtonContent, setStartStopButtonContent] = useState({});
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    switch (quizPhase) {
      case Phase.BEFORE_START:
        setStartStopButtonContent({
          icon: <FontAwesomeIcon icon={faCirclePlay} />,
          message: "Let's go!",
        });
        break;
      case Phase.RUNNING:
        setStartStopButtonContent({
          icon: <FontAwesomeIcon icon={faCircleStop} />,
          message: "Finish",
        });
        break;
      case Phase.FINISHED:
        setStartStopButtonContent({
          icon: <FontAwesomeIcon icon={faRotateRight} />,
          message: "Try again!",
        });
        break;
      default:
        setStartStopButtonContent({
          icon: <FontAwesomeIcon icon={faCirclePlay} />,
          message: "Let's go!",
        });
        break;
    }
  }, [quizPhase]);

  const onCategoryClick = (event) => {
    setCategory(event.target.id);
  };

  const onStartStopButtonClick = async (event) => {
    switch (quizPhase) {
      case Phase.BEFORE_START:
        fetchQuizData(size, language).then((items) => {
          setQuizPhase(Phase.RUNNING);
          setCurrentItemIndex(0);
          setQuizItems(items);
          setCorrectAnswers(0);
          setQuizTime(size * timeForOneItem);
        });
        setQuizPhase(Phase.PREPARING);
        break;
      case Phase.PREPARING:
        return;
      case Phase.RUNNING:
        setQuizPhase(Phase.FINISHED);
        setCurrentItemIndex(0);
        if (auth) {
          axiosPrivate.post(process.env.REACT_APP_CREATE_GAME_ENDPOINT, {
            playedAt: new Date(),
            size,
            correctAnswers,
          });
        }
        break;
      case Phase.FINISHED:
        setQuizPhase(Phase.BEFORE_START);
        break;
      default:
        break;
    }
  };

  const onAnswerButtonClick = (event) => {
    event.preventDefault();
    const currentAnswer = event.target.querySelector("#input").value;
    const items = [...quizItems];
    let tempCorrectAnswers = correctAnswers;
    let itemIndex = currentItemIndex;
    items[itemIndex].answer = currentAnswer;
    if (isAnswerCorrect(items[itemIndex].title, items[itemIndex].answer)) {
      tempCorrectAnswers++;
      items[itemIndex].isAnswered = true;
      if (itemIndex < items.length - 1) itemIndex++;
    }

    event.target.querySelector("#input").value = "";
    setCurrentItemIndex(itemIndex);
    setQuizItems(items);
    setCorrectAnswers(tempCorrectAnswers++);
  };

  const onLangSelectorChange = (event) => {
    setLanguage(event.target.value);
  };

  const onSizeSelectorChange = (event) => {
    setSize(Number.parseInt(event.target.value));
  };

  const onQuizItemPanelButtonClick = (event) => {
    const itemIndex = Number.parseInt(event.target.textContent) - 1;
    if (currentItemIndex !== itemIndex) {
      setCurrentItemIndex(itemIndex);
    }
  };

  const onAnswerInputChange = (event) => {
    const items = [...quizItems];
    const itemIndex = currentItemIndex;
    items[itemIndex].answer = event.target.value;
    setQuizItems(items);
  };

  const onTimerExpired = (intervalID) => {
    setQuizPhase(Phase.FINISHED);
    setCurrentItemIndex(0);
  };

  return (
    <div className="quiz">
      {quizPhase === Phase.PREPARING && <Loading />}

      {[Phase.BEFORE_START, Phase.PREPARING].includes(quizPhase) && (
        <div className="center">
          <h1>{quizGreetingMessage}</h1>
        </div>
      )}
      {quizPhase === Phase.FINISHED && (
        <QuizResults correct={correctAnswers} total={quizItems.length} />
      )}
      {[Phase.BEFORE_START, Phase.PREPARING].includes(quizPhase) && (
        <QuizOptions
          lang={language}
          size={size}
          onLangChange={onLangSelectorChange}
          onSizeChange={onSizeSelectorChange}
          title={"Choose category"}
          category={category}
          cards={[
            { name: "Frame", image: "/frames/godfather.jpg" },
            { name: "Description", image: "/frames/dark-knight.jpg" },
          ]}
          onCategoryClick={onCategoryClick}
        />
      )}
      <StartStopButton
        content={startStopButtonContent}
        onClick={onStartStopButtonClick}
      />
      {quizPhase === Phase.RUNNING && (
        <Timer time={quizTime} onExpired={onTimerExpired} />
      )}
      {[Phase.RUNNING, Phase.FINISHED].includes(quizPhase) && <hr />}
      {[Phase.RUNNING, Phase.FINISHED].includes(quizPhase) && (
        <QuizItemPanel
          paintWrong={quizPhase === Phase.FINISHED}
          active={currentItemIndex + 1}
          onClick={onQuizItemPanelButtonClick}
          items={quizItems}
        />
      )}
      <div className="center">
        {quizPhase === Phase.RUNNING &&
          !quizItems[currentItemIndex].isAnswered && (
            <AnswerForm
              answer={quizItems[currentItemIndex].answer}
              language={language}
              onClick={onAnswerButtonClick}
              onChange={onAnswerInputChange}
            />
          )}
        {(quizPhase === Phase.RUNNING &&
          quizItems[currentItemIndex].isAnswered) ||
          (quizPhase === Phase.FINISHED && (
            <AnswerInfo
              answer={quizItems[currentItemIndex].title}
              releaseDate={quizItems[currentItemIndex].releaseDate}
            />
          ))}
      </div>
      {[Phase.RUNNING, Phase.FINISHED].includes(quizPhase) && (
        <QuizItem category={category} item={quizItems[currentItemIndex]} />
      )}
    </div>
  );
};

export default Quiz;
