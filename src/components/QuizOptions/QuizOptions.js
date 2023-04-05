import React from "react";
import LangSelector from "../LangSelector/LangSelector";
import SizeSelector from "../SizeSelector/SizeSelector";

import "./QuizOptions.css";
import CategoryCardList from "../CardList/CategoryCardList";

const QuizOptions = ({
  lang,
  size,
  onLangChange,
  onSizeChange,
  title,
  category,
  cards,
  onCategoryClick,
}) => {
  return (
    <main className="quiz-options">
      <div className="rest-selectors">
        <LangSelector lang={lang} onChange={onLangChange} />

        <SizeSelector size={size} onChange={onSizeChange} />
      </div>
      <div className="category-selector">
        <CategoryCardList
          title={title}
          category={category}
          cards={cards}
          onClick={onCategoryClick}
        />
      </div>
    </main>
  );
};

export default QuizOptions;
