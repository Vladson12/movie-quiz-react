import axios from "../api/axios";
import getRandomInt from "./random";

const fetchQuizData = async (size, language) => {
  let items = [];
  try {
    const responseMovies = await axios.get(
      `${process.env.REACT_APP_MOVIES_ENDPOINT}?quantity=${size}&language=${language}`,
      { withCredentials: true }
    );
    responseMovies.data.forEach((movie) => {
      const index = getRandomInt(0, movie.images.length - 1);
      items.push({
        title: movie.title,
        description: movie.overview,
        image: movie.images[index],
        releaseDate: movie.releaseDate,
        isAnswered: false,
        answer: "",
      });
    });
  } catch (err) {}

  return items;
};

export default fetchQuizData;
