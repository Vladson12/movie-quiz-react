import React, { useContext } from "react";

import "../QuizOptions/QuizOptions.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import DataContext from "../../context/DataProvider";
import languages from "../../util/language";

const LangSelector = () => {
  const { lang, onLangSelectorChange } = useContext(DataContext);

  return (
    <div className="selector">
      <label className="selector-label" htmlFor="lang">
        <FontAwesomeIcon icon={faLanguage} /> {"Quiz language:"}
      </label>
      <select
        className="selector-field"
        defaultValue={lang}
        onChange={onLangSelectorChange}
        id="lang"
      >
        <option
          className="selector-option"
          selected
          value={languages.get("English")}
        >
          {"English"}
        </option>
        <option className="selector-option" value={languages.get("Русский")}>
          {"Русский"}
        </option>
        <option className="selector-option" value={languages.get("Español")}>
          {"Español"}
        </option>
      </select>
    </div>
  );
};

export default LangSelector;
