import { useEffect } from "react";
import "./Timer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const Timer = ({ time, setTime, onExpired }) => {
  useEffect(() => {
    const intervalID = setInterval(() => {
      if (time === 0) onExpired();
      setTime((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  });

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return (
    <p className="quiz-info__timer">
      <FontAwesomeIcon icon={faClock} />{" "}
      {`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
    </p>
  );
};

export default Timer;
