import React from "react";

import "./About.css";

const About = () => {
  return (
    <div className="about-section">
      <h2 className="about-section__title">About</h2>
      <p className="about-section__description">
        Welcome to Movie Quiz! This app is a simple movie quiz game. Choose quiz
        options - category, language and size and click "Let's go!" button. You
        can take the quiz in any order and return to any item to change your
        answer. Type your answer and click "Answer" button and if the answer is
        correct, the item item will be highlighted in green. Quiz time is
        limited. If you want to finish, click 'Finish' button and you'll see
        quiz results. Good luck!
      </p>
    </div>
  );
};

export default About;
