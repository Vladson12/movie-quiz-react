import React, { Component } from "react";

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
import Loading from "./Loading/Loading";
import CategoryCardList from "../components/CardList/CategoryCardList";

class App extends Component {
  constructor() {
    super();
    this.state = {
      size: 20,
      quizPhase: Phase.BEFORE_START,
      language: "en",
      currentItemIndex: 0,
      quizItems: [],
      correctAnswers: 0,
      timeForOneItem: 15,
      category: "",
      time: 0,
    };
  }

  // RENDER
  //----------------------------------------------------------------------
  render() {
    const quizItems = this.state.quizItems;
    const currentItemIndex = this.state.currentItemIndex;

    const logo = [Phase.BEFORE_START, Phase.PREPARING].includes(
      this.state.quizPhase
    ) ? (
      <div className="center">
        <Logo />
      </div>
    ) : (
      ""
    );

    const quizCta = [Phase.BEFORE_START, Phase.PREPARING].includes(
      this.state.quizPhase
    ) ? (
      <div className="center">
        <h1>{"Hey, you're good at movies, aren't you? Take the quiz!"}</h1>
      </div>
    ) : (
      ""
    );

    const quizResults =
      this.state.quizPhase === Phase.FINISHED ? (
        <QuizResults
          correct={this.state.correctAnswers}
          total={quizItems.length}
        />
      ) : (
        ""
      );

    const quizOptions = [Phase.BEFORE_START, Phase.PREPARING].includes(
      this.state.quizPhase
    ) ? (
      <QuizOptions
        lang={this.state.language}
        size={this.state.size}
        onLangChange={this.onLangSelectorChange}
        onSizeChange={this.onSizeSelectorChange}
      />
    ) : (
      ""
    );

    const categoryCardList = [Phase.BEFORE_START, Phase.PREPARING].includes(
      this.state.quizPhase
    ) ? (
      <CategoryCardList
        title={"Choose category"}
        category={this.state.category}
        cards={[
          { name: "Frame", image: "/frames/godfather.jpg" },
          { name: "Description", image: "/frames/dark-knight.jpg" },
        ]}
        onClick={this.onCategoryClick}
      />
    ) : (
      ""
    );

    let content;
    switch (this.state.quizPhase) {
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
      <StartStopButton
        content={content}
        onClick={this.onStartStopButtonClick}
      />
    );

    const timer =
      this.state.quizPhase === Phase.RUNNING ? (
        <Timer time={this.state.quizTime} onExpired={this.onTimerExpired} />
      ) : (
        ""
      );

    const horizLine = [Phase.RUNNING, Phase.FINISHED].includes(
      this.state.quizPhase
    ) ? (
      <hr />
    ) : (
      ""
    );

    const quizItemPanel = [Phase.RUNNING, Phase.FINISHED].includes(
      this.state.quizPhase
    ) ? (
      <QuizItemPanel
        paintWrong={this.state.quizPhase === Phase.FINISHED ? true : false}
        active={currentItemIndex + 1}
        onClick={this.onQuizItemPanelButtonClick}
        items={quizItems}
      />
    ) : (
      " "
    );

    const answerForm =
      this.state.quizPhase === Phase.RUNNING &&
      !quizItems[currentItemIndex].isAnswered ? (
        <AnswerForm
          answer={quizItems[currentItemIndex].answer}
          language={this.state.language}
          onClick={this.onAnswerButtonClick}
          onChange={this.onAnswerInputChange}
        />
      ) : (
        ""
      );

    const answerInfo =
      (this.state.quizPhase === Phase.RUNNING &&
        quizItems[currentItemIndex].isAnswered) ||
      this.state.quizPhase === Phase.FINISHED ? (
        <AnswerInfo
          answer={quizItems[currentItemIndex].title}
          releaseDate={quizItems[currentItemIndex].releaseDate}
        />
      ) : (
        ""
      );

    const quizItem = [Phase.RUNNING, Phase.FINISHED].includes(
      this.state.quizPhase
    ) ? (
      <QuizItem
        category={this.state.category}
        item={quizItems[currentItemIndex]}
      />
    ) : (
      ""
    );

    const quizLoadingWindow =
      this.state.quizPhase === Phase.PREPARING ? <Loading /> : "";

    return (
      <div className="App">
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
      </div>
    );
  }

  // FETCH
  //----------------------------------------------------------------------
  fetchData = async (size) => {
    let items = [];
    const fetchMovies = await fetch(
      `https://movie-quiz-ay6r.onrender.com/movie/random?quantity=${size}&language=${this.state.language}`
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
  onCategoryClick = (event) => {
    this.setState({ category: event.target.id });
  };

  onStartStopButtonClick = async (event) => {
    switch (this.state.quizPhase) {
      case Phase.BEFORE_START:
        this.fetchData(this.state.size).then((items) => {
          this.setState((state, props) => ({
            quizPhase: Phase.RUNNING,
            currentItemIndex: 0,
            quizItems: items,
            correctAnswers: 0,
            quizTime: this.state.size * this.state.timeForOneItem,
          }));
        });
        return this.setState({ quizPhase: Phase.PREPARING });
      case Phase.PREPARING:
        return;
      case Phase.RUNNING:
        return this.setState({
          quizPhase: Phase.FINISHED,
          currentItemIndex: 0,
        });
      case Phase.FINISHED:
        return this.setState({ quizPhase: Phase.BEFORE_START });
      default:
        return;
    }
  };

  onAnswerButtonClick = (event) => {
    event.preventDefault();
    const currentAnswer = event.target.querySelector("#input").value;
    const items = [...this.state.quizItems];
    let correctAnswers = this.state.correctAnswers;
    let itemIndex = this.state.currentItemIndex;
    items[itemIndex].answer = currentAnswer;
    if (isAnswerCorrect(items[itemIndex].title, items[itemIndex].answer)) {
      correctAnswers++;
      items[itemIndex].isAnswered = true;
      if (itemIndex < items.length - 1) itemIndex++;
    }

    event.target.querySelector("#input").value = "";
    this.setState({
      correctAnswers: correctAnswers++,
      quizItems: items,
      currentItemIndex: itemIndex,
    });
  };

  onLangSelectorChange = (event) => {
    this.setState({ language: event.target.value });
  };

  onSizeSelectorChange = (event) => {
    this.setState({ size: Number.parseInt(event.target.value) });
  };

  onQuizItemPanelButtonClick = (event) => {
    const itemIndex = Number.parseInt(event.target.textContent) - 1;
    if (this.state.currentItemIndex !== itemIndex) {
      this.setState({ currentItemIndex: itemIndex });
    }
  };

  onAnswerInputChange = (event) => {
    const items = [...this.state.quizItems];
    const itemIndex = this.state.currentItemIndex;
    items[itemIndex].answer = event.target.value;
    this.setState({ quizItems: items });
  };

  onTimerExpired = (intervalID) => {
    this.setState({ quizPhase: Phase.FINISHED, currentItemIndex: 0 });
  };
}

export default App;
