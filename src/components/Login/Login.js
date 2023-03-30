import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import axios from "../../api/axios";
import "./Login.css";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { setAuth, setLoggedIn } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        process.env.REACT_APP_LOGIN_ENDPOINT,
        JSON.stringify({ login: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      const role = response?.data?.role;
      setAuth({ user, password: pwd, accessToken, refreshToken, role });
      setUser("");
      setPwd("");
      setSuccess(true);
      setLoggedIn(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="Login">
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="/">Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign in to Movie Quiz</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button disabled={!user || !pwd ? true : false}>Sign In</button>
          </form>
          <p>
            New to Movie Quiz?
            <br />
            <span className="line">
              {/*put router link here*/}
              <a href="/signup">Create an account.</a>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default Login;
