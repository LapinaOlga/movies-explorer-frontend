import SearchForm from "../SearchForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {useContext, useEffect, useState} from "react";
import Spinner from "../Spinner/Spinner";
import MainApi from "../../utils/MainApi";
import Container from "../Container/Container";
import filterMovies from "../../features/filterMovies";
import Toast from "../../utils/Toast";
import {MoviesContext} from "../../contexts/MoviesContext";
import loadInternalAndExternalMovies from "../../features/loadInternalAndExternalMovies";
import './Favorites.scss'

export default function Favorites(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [hasNetworkErrors, setHasNetworkErrors] = useState(false);

  const {allMovies, setAllMovies} = useContext(MoviesContext);

  let loadingAllMoviesHash = null;

  const handleSearch = (payload) => {
    setQuery(payload.query)
    setIsShortMovie(payload.isShortMovie)

    setFilteredMovies(
      filterMovies(
        allMovies.filter((item) => item.isFavorite),
        payload.query,
        payload.isShortMovie
      )
    )
  }

  const handleDislike = (movie) => {
    MainApi.deleteMovie(movie.id)
      .then(() => {
        setAllMovies(allMovies.filter((item) => item.id !== movie.id))
      })
      .catch((error) => {
        handleAddErrorToast(error.message)
      })
  }

  const handleAddErrorToast = (message) => {
    if (typeof props.addToast === 'function') {
      props.addToast(new Toast('red', message))
    }
  }

  useEffect(() => {
    if (!allMovies.length && !isLoading) {
      const hash = String(Math.random())
      loadingAllMoviesHash = hash

      setTimeout(() => {
        if (hash === loadingAllMoviesHash) {
          setIsLoading(true)
          loadInternalAndExternalMovies()
            .then(setAllMovies)
            .catch((error) => {
              handleAddErrorToast(error.message)
              setHasNetworkErrors(true);
            })
            .finally(() => {
              setIsLoading(false);
            })
        }
      }, 500)
    }
  }, [])

  useEffect(() => {
    if (allMovies.length) {
      handleSearch({query, isShortMovie})
    }
  }, [allMovies])

  return (
    <>
      <Header/>
      <main className="favorites">
        <SearchForm
          query={query}
          isShortMovie={isShortMovie}
          onSubmit={handleSearch}
          onError={handleAddErrorToast}
        />
        {hasNetworkErrors &&
          <div className="favorites__error">
            Во время запроса произошла ошибка. Возможно, проблема с соединением или
            сервер недоступен. Подождите немного и попробуйте ещё раз
          </div>
        }
        {!hasNetworkErrors &&
          <>
            {isLoading && <div className="favorites__empty"><Spinner/></div>}
            {!isLoading &&
              <>
                {filteredMovies.length > 0 &&
                  <MovieCardList
                    movies={filteredMovies}
                    behavior="favorites"
                    onDislike={handleDislike}
                  />
                }

                <Container>
                  {filteredMovies.length === 0 &&
                    <div className="favorites__empty">Ничего не найдено</div>
                  }
                </Container>
              </>
            }
          </>
        }
      </main>
      <Footer/>
    </>
  );
}
