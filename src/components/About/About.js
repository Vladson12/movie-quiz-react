import React from "react";

import "./About.css";

const About = () => {
  return (
    <main className="about">
      <h2>About</h2>
      <p>
        Welcome to Movie Quiz! This app is a simple movie quiz game. Choose quiz
        options - category, language and size and click "Let's go!" button. You
        can take the quiz in any order and return to any item to change your
        answer. Type your answer and click "Answer" button and if the answer is
        correct, the item item will be highlighted in green. Quiz time is
        limited. If you want to finish, click 'Finish' button and you'll see
        quiz results. Good luck!
      </p>
      <p>
        If you want, you can register in Movie Quiz. Then your results will be
        saved and displayed in your statistics. Also you can take the quiz
        anonimously.
      </p>
    </main>
  );
};

export default About;
