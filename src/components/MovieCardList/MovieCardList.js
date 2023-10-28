import './MovieCardList.scss'
import MovieCard from "../MovieCard/MovieCard";
import Container from "../Container/Container";
import Button from "../Button/Button";

export default function MovieCardList() {
  return (
    <div className="movies-card-list">
      <Container>
        <div className="movies-card-list__content">
          <MovieCard/>
          <MovieCard/>
          <MovieCard/>
          <MovieCard/>
          <MovieCard/>
          <MovieCard/>
          <MovieCard/>
        </div>

        <div className="movies-card-list__footer">
          <Button variant="gray-3" className="movies-card-list__button">Еще</Button>
        </div>
      </Container>
    </div>
  );
}
