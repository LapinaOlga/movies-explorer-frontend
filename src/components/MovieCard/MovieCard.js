import './MovieCard.scss'
import cross from '../../images/cross.svg'
import bookmarkEmpty from '../../images/bookmark-empty.svg'
import bookmarkFilled from '../../images/bookmark-filled.svg'
import thumbnail from '../../images/movie.png'

export default function MovieCard() {
  return (
    <div className="movie-card">
      <div className="movie-card__header">
        <div className="movie-card__left">
          <div className="movie-card__title">33 слова о дизайне</div>
          <div className="movie-card__time">1ч 47м</div>
        </div>
        <div>
          {false && <button className="movie-card__button movie-card__button--gray">
            <img src={cross} alt="delete from bookmarks"/>
          </button>}
          {false && <button className="movie-card__button movie-card__button--gray">
            <img src={bookmarkEmpty} alt="add to bookmarks"/>
          </button>}
          {true && <button className="movie-card__button movie-card__button--green">
            <img src={bookmarkFilled} alt="added to bookmarks"/>
          </button>}
        </div>
      </div>
      <img src={thumbnail} alt="movie name" className="movie-card__image"/>
    </div>
  );
}
