import React, { useContext } from "react";

import "../QuizOptions/QuizOptions.css";
import DataContext from "../../context/DataProvider";

const SizeSelector = () => {
  const { size, onSizeSelectorChange } = useContext(DataContext);

  return (
    <div className="selector">
      <label className="selector-label" htmlFor="zise">
        {"Size:"}
      </label>
      <select
        className="selector-field"
        defaultValue={size}
        onChange={onSizeSelectorChange}
        id="size"
      >
        <option className="selector-option" value="10">
          {10}
        </option>
        <option className="selector-option" value="20">
          {20}
        </option>
        <option className="selector-option" value="30">
          {30}
        </option>
      </select>
    </div>
  );
};

export default SizeSelector;
