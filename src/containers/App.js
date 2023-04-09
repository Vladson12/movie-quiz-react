import React, { useEffect, useState } from "react";

import "./App.css";
import AnswerForm from "../components/AnswerForm/AnswerForm";
import StartStopButton from "../components/StartStopButton/StartStopButton";
import QuizItemPanel from "../components/QuizItemPanel/QuizItemPanel";
import QuizItem from "../components/QuizItem/QiuzItem";
import isAnswerCorrect from "../util/isAnswerCorrect";
import AnswerInfo from "../components/AnswerInfo/AnswerInfo";
import QuizResults from "../components/QuizResults/QuizResults";

import { Phase } from "../util/quizPhase";
import Timer from "../components/Timer/Timer";
import QuizOptions from "../components/QuizOptions/QuizOptions";
import Loading from "../components/Loading/Loading";
import { Route, Routes } from "react-router-dom";
import About from "../components/About/About";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

import { useCookies } from "react-cookie";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import fetchQuizData from "../util/fetchQuizData";
import { quizGreetingMessage } from "../util/quizMessages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCircleStop,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import Profile from "../components/Profile/Profile";
import Layout from "./Layout";
import { AuthenticatedRoute } from "./AuthenticatedRoute";
import CTA from "../components/CTA/CTA";
import Quiz from "../components/Quiz/Quiz";
import { UnauthenticatedRoute } from "./UnauthenticatedRoute";

const App = () => {
  const { auth, setAuth } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const setUserData = async () => {
      if (cookies.user) {
        try {
          const responseMe = await axiosPrivate.get(
            process.env.REACT_APP_GET_CURRENT_USER_ENDPOINT
          );
          setAuth(responseMe.data);
        } catch (err) {
          if (err.response && err.response.status === 401) {
            setAuth(null);
            removeCookie("user", { path: "/" });
          }
        }
      }
    };

    setUserData();
  }, [axiosPrivate, cookies, removeCookie, setAuth]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CTA />} />
        <Route
          exact
          path="login"
          element={
            <UnauthenticatedRoute>
              <Login />
            </UnauthenticatedRoute>
          }
        />
        <Route
          exact
          path="quiz"
          element={
            <AuthenticatedRoute>
              <Quiz />
            </AuthenticatedRoute>
          }
        />
        <Route
          exact
          path="profile"
          element={
            <AuthenticatedRoute>
              <Profile />
            </AuthenticatedRoute>
          }
        />
        <Route
          exact
          path="signup"
          element={
            <UnauthenticatedRoute>
              <Register />
            </UnauthenticatedRoute>
          }
        />
        <Route exact path="about" element={<About />} />
      </Route>
    </Routes>
  );
};

export default App;
