import React, { useEffect } from "react";

import "./App.css";

import { Route, Routes } from "react-router-dom";
import About from "../components/About/About";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

import { useCookies } from "react-cookie";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Profile from "../components/Profile/Profile";
import Layout from "./Layout";
import { AuthenticatedRoute } from "./AuthenticatedRoute";
import CTA from "../components/CTA/CTA";
import Quiz from "../components/Quiz/Quiz";
import { UnauthenticatedRoute } from "./UnauthenticatedRoute";
import PlayQuiz from "../components/PlayQuiz/PlayQuiz";

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
        <Route index element={!auth ? <CTA /> : <PlayQuiz />} />
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
