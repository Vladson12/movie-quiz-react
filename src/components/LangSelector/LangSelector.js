import React from "react";

import "../QuizOptions/QuizOptions.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";

const LangSelector = ({ lang, onChange }) => {
  return (
    <div className="selector">
      <label className="selector-label" htmlFor="lang">
        <FontAwesomeIcon icon={faLanguage} /> {"Quiz language:"}
      </label>
      <select
        className="selector-field"
        defaultValue={lang}
        onChange={onChange}
        id="lang"
      >
        <option className="selector-option" value="en">
          {"English"}
        </option>
        <option className="selector-option" value="ru">
          {"Русский"}
        </option>
        <option className="selector-option" value="es">
          {"Español"}
        </option>
      </select>
    </div>
  );
};

export default LangSelector;
