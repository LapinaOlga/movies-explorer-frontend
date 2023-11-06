export default function convertExternalMovie(movie) {
  return {
    id: null,
    country: movie.country,
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    image: process.env.REACT_APP_MOVIES_LIBRARY_URL + movie.image.url,
    trailerLink: movie.trailerLink,
    thumbnail: process.env.REACT_APP_MOVIES_LIBRARY_URL + movie.image.formats.thumbnail.url,
    movieId: movie.id,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
    isFavorite: false,
  };
}
