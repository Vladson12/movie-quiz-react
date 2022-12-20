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

  // componentDidMount() {
  //   this.setState({ time: this.props.time });
  //   this.interval = setInterval(() => {
  //     const newTime = this.state.time - 1;
  //     if (newTime === 0) this.props.onExpired();
  //     this.setState({ time: newTime });
  //   }, 1000);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return (
    <p className="timer">{`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}</p>
  );
};

export default Timer;
