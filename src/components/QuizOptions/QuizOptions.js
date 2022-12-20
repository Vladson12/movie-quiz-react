import React from "react";
import LangSelector from "../LangSelector/LangSelector";
import SizeSelector from "../SizeSelector/SizeSelector";

import "./QuizOptions.css";

const QuizOptions = ({ lang, size, onLangChange, onSizeChange }) => {
  return (
    <div className="center">
      <LangSelector lang={lang} onChange={onLangChange} />

      <SizeSelector size={size} onChange={onSizeChange} />
    </div>
  );
};

export default QuizOptions;
