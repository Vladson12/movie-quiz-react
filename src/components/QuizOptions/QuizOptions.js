import LangSelector from "../LangSelector/LangSelector";
import SizeSelector from "../SizeSelector/SizeSelector";

import "./QuizOptions.css";
import CategoryCardList from "../CardList/CategoryCardList";

const QuizOptions = ({ cards }) => {
  return (
    <main className="quiz-options">
      <div className="rest-selectors">
        <LangSelector />

        <SizeSelector />
      </div>
      <div className="category-selector">
        <CategoryCardList cards={cards} />
      </div>
    </main>
  );
};

export default QuizOptions;
