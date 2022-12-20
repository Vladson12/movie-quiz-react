import React from "react";

const SizeSelector = ({ size, onChange }) => {
  return (
    <div className="center selector">
      <label className="selector-label" htmlFor="zise">
        {"Choose quiz size:"}
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
        <option className="selector-option" value="15">
          {15}
        </option>
        <option className="selector-option" value="20">
          {20}
        </option>
        <option className="selector-option" value="25">
          {25}
        </option>
        <option className="selector-option" value="30">
          {30}
        </option>
      </select>
    </div>
  );
};

export default SizeSelector;
