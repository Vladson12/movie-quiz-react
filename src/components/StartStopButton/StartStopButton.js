import React from "react";

import "./StartStopButton.css";

const StartStopButton = ({ content, onClick }) => {
  return (
    <div className="center">
      <button className=" start-stop-button--button" onClick={onClick}>
        {content}
      </button>
    </div>
  );
};

export default StartStopButton;
