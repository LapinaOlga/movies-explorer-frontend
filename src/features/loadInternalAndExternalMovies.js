import MoviesApi from "../utils/MoviesApi";
import MainApi from "../utils/MainApi";
import convertExternalMovie from "./convertExternalMovie";

export default function loadInternalAndExternalMovies() {
  return Promise.all([
    MoviesApi.getAll(),
    MainApi.getMovies(),
  ])
    .then((responses) => {
      const result = responses[0].map((item) => convertExternalMovie(item));
      result.map((movie) => {
        const internalMovie = responses[1].data.find((item) => movie.movieId === item.movieId)
        if (internalMovie) {
          movie.id = internalMovie._id
          movie.isFavorite = true
        }
      })

      return result;
    })
}
