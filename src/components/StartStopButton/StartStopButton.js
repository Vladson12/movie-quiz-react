import React, { useContext } from "react";

import "./StartStopButton.css";
import DataContext from "../../context/DataProvider";

const StartStopButton = () => {
  const { startStopButtonContent, onStartStopButtonClick } =
    useContext(DataContext);

  return (
    <div className="center">
      <button
        className=" start-stop-button--button"
        onClick={onStartStopButtonClick}
      >
        {startStopButtonContent.icon} {startStopButtonContent.message}
      </button>
    </div>
  );
};

export default StartStopButton;
