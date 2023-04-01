import React, { useContext, useEffect, useState } from "react";

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
import Timer from "../components/Timer/Timer";
import QuizOptions from "../components/QuizOptions/QuizOptions";
import Loading from "../components/Loading/Loading";
import CategoryCardList from "../components/CardList/CategoryCardList";
import { Route, Switch } from "react-router-dom";
import About from "../components/About/About";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Navigation from "../components/Navigation/Navigation";

import { useCookies } from "react-cookie";
import { axiosPrivate } from "../api/axios";
import AuthContext from "../context/AuthProvider";

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
  const [startStopButtonContent, setStartStopButtonContent] =
    useState("LET'S GO!");

  const { setAuth } = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies([
    "login",
    "accessToken",
    "refreshToken",
  ]);

  useEffect(() => {
    const fun = async () => {
      if (cookies?.accessToken) {
        const partsOfAccessToken = cookies.accessToken.split(".");
        const accessTokenPayload = JSON.parse(atob(partsOfAccessToken[1]));
        const accessTokenExp = accessTokenPayload.exp * 1000;
        if (accessTokenExp < Date.now() && cookies?.refreshToken) {
          const partsOfRefreshToken = cookies.refreshToken.split(".");
          const refreshTokenPayload = JSON.parse(atob(partsOfRefreshToken[1]));
          const refreshTokenExp = refreshTokenPayload.exp * 1000;
          if (refreshTokenExp < Date.now()) {
            removeCookie("accessToken", { path: "/" });
            setAuth(null);
          } else {
            try {
              const response = await axiosPrivate.post(
                process.env.REACT_APP_REFRESH_ENDPOINT,
                {},
                { headers: { Authorization: `Bearer ${cookies.refreshToken}` } }
              );
              setCookie("accessToken", response.data.accessToken, {
                path: "/",
              });
              setCookie("refreshToken", response.data.refreshToken, {
                path: "/",
              });
            } catch (err) {
              setAuth(null);
            }
          }
        }
      }
    };

    fun();
  }, []);

  useEffect(() => {
    switch (quizPhase) {
      case Phase.BEFORE_START:
        setStartStopButtonContent("LET'S GO!");
        break;
      case Phase.RUNNING:
        setStartStopButtonContent("FINISH");
        break;
      case Phase.FINISHED:
        setStartStopButtonContent("TRY AGAIN");
        break;
      default:
        setStartStopButtonContent("LET'S GO!");
        break;
    }
  }, [quizPhase]);

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

  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route exact path="/">
          {quizPhase === Phase.PREPARING && <Loading />}
          {[Phase.BEFORE_START, Phase.PREPARING].includes(quizPhase) && (
            <div className="center">
              <Logo />
            </div>
          )}
          {[Phase.BEFORE_START, Phase.PREPARING].includes(quizPhase) && (
            <div className="center">
              <h1>
                {"Hey, you're good at movies, aren't you? Take the quiz!"}
              </h1>
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
            />
          )}
          {[Phase.BEFORE_START, Phase.PREPARING].includes(quizPhase) && (
            <CategoryCardList
              title={"Choose category"}
              category={category}
              cards={[
                { name: "Frame", image: "/frames/godfather.jpg" },
                { name: "Description", image: "/frames/dark-knight.jpg" },
              ]}
              onClick={onCategoryClick}
            />
          )}
          <div className="center">
            <StartStopButton
              content={startStopButtonContent}
              onClick={onStartStopButtonClick}
            />
            {quizPhase === Phase.RUNNING && (
              <Timer time={quizTime} onExpired={onTimerExpired} />
            )}
          </div>
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
        </Route>
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/about" component={About} />
      </Switch>
    </div>
  );
};

export default App;
