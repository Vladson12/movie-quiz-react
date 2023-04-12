import LangSelector from "../LangSelector/LangSelector";
import SizeSelector from "../SizeSelector/SizeSelector";

import "./QuizOptions.css";
import CategoryCardList from "../CardList/CategoryCardList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import DataContext from "../../context/DataProvider";
import { useEffect } from "react";

const QuizOptions = ({ cards }) => {
  const { quizTime, setQuizTime, size, timeForOneItem } =
    useContext(DataContext);

  const minutes = Math.floor(quizTime / 60);
  const seconds = Math.floor(quizTime % 60);

  useEffect(() => {
    setQuizTime(size * timeForOneItem);
  }, [setQuizTime, size, timeForOneItem]);

  return (
    <main className="quiz-options">
      <div className="rest-selectors">
        <LangSelector />
        <SizeSelector />
        <p className="quiz-info__timer">
          <FontAwesomeIcon icon={faClock} />{" "}
          {`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
        </p>
      </div>
      <div className="category-selector">
        <CategoryCardList cards={cards} />
      </div>
    </main>
  );
};

export default QuizOptions;
