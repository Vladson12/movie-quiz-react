const isAnswerCorrect = (correct, actual) => {
  const correctReplaced = correct
    .replace(/[^а-яА-ЯёЁa-zA-z0-9]/g, "")
    .replace("ё", "е")
    .toLowerCase();
  const actualReplaced = actual
    .replace(/[^а-яА-ЯёЁa-zA-z0-9']/g, "")
    .replace("ё", "е")
    .toLowerCase();

  console.log(correctReplaced);
  console.log(actualReplaced);
  return correctReplaced === actualReplaced;
};

export default isAnswerCorrect;
