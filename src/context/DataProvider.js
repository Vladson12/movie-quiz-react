import { createContext, useEffect, useState } from "react";
import { Phase } from "../util/quizPhase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCircleStop,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import isAnswerCorrect from "../util/isAnswerCorrect";
import fetchQuizData from "../util/fetchQuizData";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import languages from "../util/language";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [size, setSize] = useState(20);
  const [quizPhase, setQuizPhase] = useState(Phase.BEFORE_START);
  const [language, setLanguage] = useState(languages.get("English"));
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [quizItems, setQuizItems] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeForOneItem, setTimeForOneItem] = useState(15);
  const [quizTime, setQuizTime] = useState(0);
  const [category, setCategory] = useState("Frame");
  const [startStopButtonContent, setStartStopButtonContent] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

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
          setCurrentItemIndex(0);
          setQuizItems(items);
          setCorrectAnswers(0);
          setQuizPhase(Phase.RUNNING);
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
    <DataContext.Provider
      value={{
        quizPhase,
        setQuizPhase,
        size,
        setSize,
        language,
        setLanguage,
        currentItemIndex,
        setCurrentItemIndex,
        quizItems,
        setQuizItems,
        correctAnswers,
        setCorrectAnswers,
        timeForOneItem,
        setTimeForOneItem,
        quizTime,
        setQuizTime,
        category,
        setCategory,
        startStopButtonContent,
        setStartStopButtonContent,
        onAnswerButtonClick,
        onCategoryClick,
        onLangSelectorChange,
        onQuizItemPanelButtonClick,
        onStartStopButtonClick,
        onSizeSelectorChange,
        onAnswerInputChange,
        onTimerExpired,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
