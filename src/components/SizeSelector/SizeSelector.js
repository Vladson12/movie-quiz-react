import React from "react";

import "../QuizOptions/QuizOptions.css";

const SizeSelector = ({ size, onChange }) => {
  return (
    <div className="selector">
      <label className="selector-label" htmlFor="zise">
        {"Size:"}
      </label>
      <select
        className="selector-field"
        defaultValue={size}
        onChange={onChange}
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
