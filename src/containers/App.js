import React, { useState } from "react";

import "./App.css";
import Logo from "../components/Logo/Logo";
import AnswerForm from "../components/AnswerForm/AnswerForm";
import StartStopButton from "../components/StartStopButton/StartStopButton";
import QuizItemPanel from "../components/QuizItemPanel/QuizItemPanel";
import QuizItem from "../components/QuizItem/QiuzItem";
import isAnswerCorrect from "../util/isAnswerCorrect";
import getRandomInt from "../util/random";
import AnswerInfo from "../components/AnswerInfo/AnswerInfo";
import QuizResults from "../components/QuizResults/QuizResults";

import { Phase } from "../util/quizPhase";
import Timer from "./Timer/Timer";
import QuizOptions from "../components/QuizOptions/QuizOptions";
import Loading from "../Loading/Loading";
import CategoryCardList from "../components/CardList/CategoryCardList";
import { Route, Switch } from "react-router-dom";
import About from "../components/About/About";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Navigation from "../components/Navigation/Navigation";

const App = () => {
  const [size, setSize] = useState(20);
  const [quizPhase, setQuizPhase] = useState(Phase.BEFORE_START);
  const [language, setLanguage] = useState("en");
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [quizItems, setQuizItems] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeForOneItem, setTimeForOneItem] = useState(15);
  const [quizTime, setQuizTime] = useState(0);
  const [category, setCategory] = useState("");

  // FETCH
  //----------------------------------------------------------------------
  const fetchData = async (size) => {
    let items = [];
    const fetchMovies = await fetch(
      `${process.env.REACT_APP_BE_BASE_URL}${process.env.REACT_APP_MOVIES_ENDPOINT}?quantity=${size}&language=${language}`
    );
    const data = await fetchMovies.json();
    data.forEach((movie) => {
      const index = getRandomInt(0, movie.images.length - 1);
      items.push({
        title: movie.title,
        description: movie.overview,
        image: movie.images[index],
        releaseDate: movie.releaseDate,
        isAnswered: false,
        answer: "",
      });
    });

    return items;
  };

  // HANDLERS
  //----------------------------------------------------------------------
  const onCategoryClick = (event) => {
    setCategory(event.target.id);
  };

  const onStartStopButtonClick = async (event) => {
    switch (quizPhase) {
      case Phase.BEFORE_START:
        fetchData(size).then((items) => {
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

  const logo = [Phase.BEFORE_START, Phase.PREPARING].includes(quizPhase) ? (
    <div className="center">
      <Logo />
    </div>
  ) : (
    ""
  );

  const quizCta = [Phase.BEFORE_START, Phase.PREPARING].includes(quizPhase) ? (
    <div className="center">
      <h1>{"Hey, you're good at movies, aren't you? Take the quiz!"}</h1>
    </div>
  ) : (
    ""
  );

  const quizResults =
    quizPhase === Phase.FINISHED ? (
      <QuizResults correct={correctAnswers} total={quizItems.length} />
    ) : (
      ""
    );

  const quizOptions = [Phase.BEFORE_START, Phase.PREPARING].includes(
    quizPhase
  ) ? (
    <QuizOptions
      lang={language}
      size={size}
      onLangChange={onLangSelectorChange}
      onSizeChange={onSizeSelectorChange}
    />
  ) : (
    ""
  );

  const categoryCardList = [Phase.BEFORE_START, Phase.PREPARING].includes(
    quizPhase
  ) ? (
    <CategoryCardList
      title={"Choose category"}
      category={category}
      cards={[
        { name: "Frame", image: "/frames/godfather.jpg" },
        { name: "Description", image: "/frames/dark-knight.jpg" },
      ]}
      onClick={onCategoryClick}
    />
  ) : (
    ""
  );

  let content;
  switch (quizPhase) {
    case Phase.BEFORE_START:
      content = "LET'S GO!";
      break;
    case Phase.RUNNING:
      content = "FINISH";
      break;
    case Phase.FINISHED:
      content = "TRY AGAIN";
      break;
    default:
      content = "LET'S GO!";
  }
  const startStopButton = (
    <StartStopButton content={content} onClick={onStartStopButtonClick} />
  );

  const timer =
    quizPhase === Phase.RUNNING ? (
      <Timer time={quizTime} onExpired={onTimerExpired} />
    ) : (
      ""
    );

  const horizLine = [Phase.RUNNING, Phase.FINISHED].includes(quizPhase) ? (
    <hr />
  ) : (
    ""
  );

  const quizItemPanel = [Phase.RUNNING, Phase.FINISHED].includes(quizPhase) ? (
    <QuizItemPanel
      paintWrong={quizPhase === Phase.FINISHED ? true : false}
      active={currentItemIndex + 1}
      onClick={onQuizItemPanelButtonClick}
      items={quizItems}
    />
  ) : (
    " "
  );

  const answerForm =
    quizPhase === Phase.RUNNING && !quizItems[currentItemIndex].isAnswered ? (
      <AnswerForm
        answer={quizItems[currentItemIndex].answer}
        language={language}
        onClick={onAnswerButtonClick}
        onChange={onAnswerInputChange}
      />
    ) : (
      ""
    );

  const answerInfo =
    (quizPhase === Phase.RUNNING && quizItems[currentItemIndex].isAnswered) ||
    quizPhase === Phase.FINISHED ? (
      <AnswerInfo
        answer={quizItems[currentItemIndex].title}
        releaseDate={quizItems[currentItemIndex].releaseDate}
      />
    ) : (
      ""
    );

  const quizItem = [Phase.RUNNING, Phase.FINISHED].includes(quizPhase) ? (
    <QuizItem category={category} item={quizItems[currentItemIndex]} />
  ) : (
    ""
  );

  const quizLoadingWindow = quizPhase === Phase.PREPARING ? <Loading /> : "";

  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route exact path="/">
          {quizLoadingWindow}
          {logo}
          {quizCta}
          {quizResults}
          {quizOptions}
          {categoryCardList}
          <div className="center">
            {startStopButton}
            {timer}
          </div>
          {horizLine}
          {quizItemPanel}
          <div className="center">
            {answerForm}
            {answerInfo}
          </div>
          {quizItem}
        </Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/about" component={About} />
      </Switch>
    </div>
  );
};

export default App;
