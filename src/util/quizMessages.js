export const getQuizResultMessage = (rate) => {
  if (rate >= 0.99) return "You're genius!🧓🎓🎉👍";
  if (rate >= 0.9) return "You're excellent!😲";
  if (rate >= 0.75) return "OK, you're pretty good.😉";
  if (rate >= 0.5)
    return "Not too bad. Far from a movie professional, though.😐";
  if (rate >= 0.3) return "Well, I was expecting more...👎";
  return "You don't seem to watch movies...💩";
};

export const quizGreetingMessage =
  "Hey, you're good at movies, aren't you? Take the quiz!";
