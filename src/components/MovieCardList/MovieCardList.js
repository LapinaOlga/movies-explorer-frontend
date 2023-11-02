import './MovieCardList.scss'
import MovieCard from "../MovieCard/MovieCard";
import Container from "../Container/Container";

export default function MovieCardList(props) {
  const handleLike = (externalMovie) => {
    if (typeof props.onLike === 'function') {
      props.onLike(externalMovie)
    }
  }

  const handleDislike = (internalMovie) => {
    if (typeof props.onDislike === 'function') {
      props.onDislike(internalMovie)
    }
  }

  const movieList = props.movies.map((movie) => {
    return (
      <MovieCard
        movie={movie}
        key={movie.movieId}
        behavior={props.behavior}
        onLike={handleLike}
        onDislike={handleDislike}
      />
    );
  })

  return (
    <div className="movies-card-list">
      <Container>
        <div className="movies-card-list__content">
          {movieList}
        </div>
      </Container>
    </div>
  );
}
