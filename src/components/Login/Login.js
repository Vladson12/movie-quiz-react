import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import axios from "../../api/axios";
import "./Login.css";
import useAuth from "../../hooks/useAuth";
import { useCookies } from "react-cookie";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { auth, setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [cookies, setCookie] = useCookies(["user"]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responseLogin = await axios.post(
        process.env.REACT_APP_LOGIN_ENDPOINT,
        JSON.stringify({ login: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setCookie(
        "user",
        {
          accessToken: responseLogin.data.accessToken,
          refreshToken: responseLogin.data.refreshToken,
        },
        { path: "/" }
      );
      setUser("");
      setPwd("");
      navigate("/", { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Incorrect username or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="login">
      {auth ? (
        <section className="login-section">
          <h1>{`You are already logged in as ${auth.login}! Please log out first.`}</h1>
        </section>
      ) : (
        <section className="login-section">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="login-section__title">Sign in to Movie Quiz</h1>
          <form className="login-section__form" onSubmit={handleSubmit}>
            <label htmlFor="text">Email:</label>
            <input
              className="form-login--input"
              type="text"
              id="text"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              className="form-login--input"
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button
              className="login-section__form__button"
              disabled={!user || !pwd ? true : false}
            >
              Sign in
            </button>
          </form>
          <p>
            New to Movie Quiz?
            <br />
            <span className="line">
              {/*put router link here*/}
              <Link className="login-section__link" to="/signup">
                Create an account
              </Link>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default Login;
