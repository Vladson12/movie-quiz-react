import React from "react";

import "./CategoryCard.css";

const CategoryCard = ({ active, onClick, name, image }) => {
  return (
    <div
      id={name.toLowerCase()}
      className={`card ${active ? "active" : ""}`}
      style={{
        backgroundImage: `url("${image}")`,
      }}
      onClick={onClick}
    >
      <div>
        <h1>{name}</h1>
      </div>
    </div>
  );
};

export default CategoryCard;
