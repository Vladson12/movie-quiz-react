import { useState } from "react";
import "./Loading.css";
import { useEffect } from "react";

const Loading = () => {
  const [currDots, setCurrDots] = useState(".");

  useEffect(() => {
    const timeout = setTimeout(() => {
      switch (currDots) {
        case ".":
          setCurrDots("..");
          break;
        case "..":
          setCurrDots("...");
          break;
        case "...":
          setCurrDots(".");
          break;
        default:
          setCurrDots(".");
          break;
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [currDots]);

  return (
    <div className="modal show-modal">
      <div className="modal-content">
        <h1>{`Loading${currDots}`}</h1>
      </div>
    </div>
  );
};

export default Loading;
