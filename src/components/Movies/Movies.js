import './Movies.scss'
import SearchForm from "../SearchForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {useEffect, useState} from "react";
import MoviesApi from "../../utils/MoviesApi";
import Toast from "../../utils/Toast";
import Spinner from "../Spinner/Spinner";
import MainApi from "../../utils/MainApi";
import Button from "../Button/Button";
import Container from "../Container/Container";
import convertExternalMovie from "../../features/convertExternalMovie";
import filterMovies from "../../features/filterMovies";

const DESKTOP_PER_PAGE = 3;
const DESKTOP_LIMIT = DESKTOP_PER_PAGE * 4;
const TABLET_PER_PAGE = 2;
const TABLET_LIMIT = TABLET_PER_PAGE * 4;
const MOBILE_PER_PAGE = 2;
const MOBILE_LIMIT = 5;

const TABLET_WIDTH = 768;
const DESKTOP_WIDTH = 1140;

export default function Movies(props) {
  const [width, setWidth] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [allMovies, setAllMovies] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredTotal, setFilteredTotal] = useState([]);

  const [query, setQuery] = useState(localStorage.getItem('query') ?? '');
  const [isShortMovie, setIsShortMovie] = useState(localStorage.getItem('isShortMovie') === '1');
  const [hasNetworkErrors, setHasNetworkErrors] = useState(false);

  const handleSearch = (payload) => {
    if (!payload.query) {
      localStorage.removeItem('query')
    } else {
      localStorage.setItem('query', payload.query)
    }

    if (typeof payload.isShortMovie === 'boolean') {
      localStorage.setItem('isShortMovie', payload.isShortMovie ? 1 : 0)
    } else {
      localStorage.removeItem('isShortMovie')
    }

    setQuery(payload.query)
    setIsShortMovie(payload.isShortMovie)

    if (allMovies === null) {
      if (payload.query) {
        loadAllMovies()
      }
    } else {
      let limit = payload.limit;

      if (!limit) {
        if (width < TABLET_WIDTH) {
          limit = MOBILE_LIMIT
        } else if (width < DESKTOP_WIDTH) {
          limit = TABLET_LIMIT
        } else {
          limit = DESKTOP_LIMIT
        }
      }

      const foundMovies = filterMovies(allMovies, payload.query, payload.isShortMovie);
      setFilteredTotal(foundMovies.length)
      setFilteredMovies(foundMovies.slice(0, limit))
    }
  }

  const handleLike = (movie) => {
    MainApi.postMovie(movie)
      .then((res) => {
        setAllMovies([
          ...allMovies.map((item) => {
            if (item.movieId === movie.movieId) {
              item.id = res.data._id;
              item.isFavorite = true
            }

            return item
          })
        ])
      })
      .catch((error) => {
        handleAddErrorToast(error.message);
      })
  }

  const handleDislike = (movie) => {
    MainApi.deleteMovie(movie.id)
      .then(() => {
        setAllMovies([
          ...allMovies.map((item) => {
            if (item.movieId === movie.movieId) {
              item.id = null
              item.isFavorite = false
            }

            return item
          })
        ])
      })
      .catch((error) => {
        handleAddErrorToast(error.message)
      })
  }

  const loadMore = () => {
    let limit = filteredMovies.length;

    if (width < TABLET_WIDTH) {
      limit += MOBILE_PER_PAGE
    } else if (width < DESKTOP_WIDTH) {
      limit += TABLET_PER_PAGE
    } else {
      limit += DESKTOP_PER_PAGE
    }

    handleSearch({
      query,
      isShortMovie,
      limit,
    })
  }

  const handleAddErrorToast = (message) => {
    if (typeof props.addToast === 'function') {
      props.addToast(new Toast('red', message))
    }
  }

  const loadAllMovies = () => {
    setIsLoading(true);
    Promise.all([
      MoviesApi.getAll(),
      MainApi.getMovies(),
    ])
      .then((responses) => {
        const movies = responses[0].map((item) => convertExternalMovie(item));
        movies.map((movie) => {
          const internalMovie = responses[1].data.find((item) => movie.movieId === item.movieId)
          if (internalMovie) {
            movie.id = internalMovie._id
            movie.isFavorite = true
          }
        })

        setAllMovies(movies);
      })
      .catch((error) => {
        handleAddErrorToast(error.message)
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  useEffect(() => {
    let resizeHash = null;
    const onResize = () => {

      const hash = String(Math.random());
      resizeHash = hash;

      setTimeout(() => {
        if (resizeHash === hash) {
          setWidth(window.outerWidth)
        }
      }, 300)
    };

    window.addEventListener('resize', onResize);

    return _ => {
      window.removeEventListener('resize', onResize)
    }
  }, []);

  useEffect(() => {
    setWidth(window.outerWidth)
    if (query) {
      handleSearch({query, isShortMovie})
    }
  }, [])

  useEffect(() => {
    if (!filteredMovies.length) {
      handleSearch({query, isShortMovie})
    }
  }, [allMovies])

  useEffect(() => {
    let perPage, limit
    if (width < TABLET_WIDTH) {
      perPage = MOBILE_PER_PAGE
      limit = MOBILE_LIMIT
    } else if (width < DESKTOP_WIDTH) {
      perPage = TABLET_PER_PAGE
      limit = TABLET_LIMIT
    } else {
      perPage = DESKTOP_PER_PAGE
      limit = DESKTOP_LIMIT
    }

    handleSearch({
      query,
      isShortMovie,
      limit: Math.max(filteredMovies.length - filteredMovies.length % perPage, limit),
    })
  }, [width])

  return (
    <>
      <Header/>
      <main className="movies">
        <SearchForm query={query}
                    isShortMovie={isShortMovie}
                    onSubmit={handleSearch}
                    onError={handleAddErrorToast}
        />
        {hasNetworkErrors &&
          <div className="movies__error">
            Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер
            недоступен. Подождите немного и попробуйте ещё раз
          </div>
        }
        {!hasNetworkErrors &&
          <>
            {isLoading && <div className="movies__empty"><Spinner/></div>}
            {!isLoading &&
              <>
                {filteredMovies.length > 0 &&
                  <MovieCardList movies={filteredMovies}
                                 behavior="all"
                                 onLike={handleLike}
                                 onDislike={handleDislike}
                  />
                }

                <Container>
                  {filteredMovies.length > 0 &&
                    <div className="movies__footer">
                      {filteredTotal > filteredMovies.length &&
                        <Button variant="gray-3" className="movies__button" onClick={loadMore}>
                          Еще
                        </Button>
                      }
                    </div>
                  }

                  {filteredMovies.length === 0 &&
                    <div className="movies__empty">Ничего не найдено</div>
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
