import { useEffect, useState } from "react";
import "./Timer.css";

const Timer = (props) => {
  const [time, setTime] = useState(props.time);

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (time === 0) props.onExpired();
      setTime((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  });

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return (
    <p className="timer">{`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}</p>
  );
};

export default Timer;
