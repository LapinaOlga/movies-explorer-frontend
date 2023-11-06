export default function filterMovies(movies, query, isShortMovie) {
  return (movies || [])
    .filter((movie) => {
      return !query
        || movie.nameRU.toLowerCase().includes(query.toLowerCase())
        || movie.nameEN.toLowerCase().includes(query.toLowerCase())
    })
    .filter((movie) => {
      if (typeof isShortMovie === 'boolean') {
        return !isShortMovie || movie.duration < 40;
      }

      return true;
    })
}
