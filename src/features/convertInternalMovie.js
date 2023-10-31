export default function convertInternalMovie(movie) {
  return {
    id: movie._id,
    country: movie.country,
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    image: movie.image,
    trailerLink: movie.trailerLink,
    thumbnail: movie.thumbnail,
    movieId: movie.movieId,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
    isFavorite: true,
  };
}
