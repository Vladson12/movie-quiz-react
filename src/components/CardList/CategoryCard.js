import React from "react";

import "./CategoryCard.css";

const CategoryCard = ({ active, onClick, name, image }) => {
  return (
    <button
      id={name.toLowerCase()}
      className={`card ${active ? "active" : ""}`}
      style={{
        backgroundImage: `url("${image}")`,
      }}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default CategoryCard;
