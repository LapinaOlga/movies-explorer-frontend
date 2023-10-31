import './MovieCard.scss'
import cross from '../../images/cross.svg'
import bookmarkEmpty from '../../images/bookmark-empty.svg'
import bookmarkFilled from '../../images/bookmark-filled.svg'

export default function MovieCard(props) {
  const hours = Math.floor(props.movie.duration / 60);
  const minutes = props.movie.duration - hours * 60;
  const duration = hours > 0
    ? `${hours}ч ${minutes}м`
    : `${minutes}м`;
  const hasDeleteButton = props.behavior === 'favorites';

  const handleLike = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (typeof props.onLike === 'function') {
      props.onLike(props.movie)
    }
  }

  const handleDislike = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (typeof props.onDislike === 'function') {
      props.onDislike(props.movie)
    }
  }

  return (
    <a href={props.movie.trailerLink} className="movie-card" target="_blank">
      <div className="movie-card__header">
        <div className="movie-card__left">
          <div className="movie-card__title">{props.movie.nameRU}</div>
          <div className="movie-card__time">{duration}</div>
        </div>
        <div>
          {hasDeleteButton &&
            <button className="movie-card__button movie-card__button--gray" onClick={handleDislike}>
              <img src={cross} alt="delete from bookmarks"/>
            </button>
          }
          {!hasDeleteButton && !props.movie.isFavorite &&
            <button className="movie-card__button movie-card__button--gray" onClick={handleLike}>
              <img src={bookmarkEmpty} alt={`add ${props.movie.nameRU} to bookmarks`}/>
            </button>
          }
          {!hasDeleteButton && props.movie.isFavorite &&
            <button className="movie-card__button movie-card__button--green" onClick={handleDislike}>
              <img src={bookmarkFilled} alt={`remove ${props.movie.nameRU} from bookmarks`}/>
            </button>
          }
        </div>
      </div>
      <img src={props.movie.image} alt={props.movie.nameEN} className="movie-card__image"/>
    </a>
  );
}
