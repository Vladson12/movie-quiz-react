import React, { useContext } from "react";

import Card from "./CategoryCard";
import "./CategoryCardList.css";
import DataContext from "../../context/DataProvider";

const CategoryCardList = ({ cards }) => {
  const { category, onCategoryClick } = useContext(DataContext);

  return (
    <div className="category-card-list">
      <h2 className="title">Choose category</h2>
      <div className="card-list">
        {cards.map((card, i) => {
          return (
            <Card
              active={category === card.name.toLowerCase() ? true : false}
              onClick={onCategoryClick}
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
