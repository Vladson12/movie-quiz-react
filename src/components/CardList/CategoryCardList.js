import React from "react";

import Card from "./CategoryCard";
import "./CategoryCardList.css";

const CategoryCardList = ({ category, onClick, title, cards }) => {
  return (
    <div className="category-card-list">
      <h1 className="title">{title}</h1>
      <div className="card-list">
        {cards.map((card, i) => {
          return (
            <Card
              active={category === card.name.toLowerCase() ? true : false}
              onClick={onClick}
              key={i}
              id={card.name}
              name={card.name}
              image={card.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategoryCardList;
