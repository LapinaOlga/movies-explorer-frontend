import './SearchForm.scss'
import Container from "../Container/Container";
import search from '../../images/search.svg'
import submitArrow from '../../images/submit-arrow.svg'
import Switch from "../Switch/Switch";
import InputWithValidation from "../InputWithValidation/InputWithValidation";
import {useEffect, useState} from "react";

export default function SearchForm(props) {
  const [query, setQuery] = useState(props.query)
  const [isShortMovie, setIsShortMovie] = useState(props.isShortMovie)

  const handleSubmitFormEvent = (e) => {
    e.preventDefault();
    const isValid = e.target.reportValidity();

    if (isValid && typeof props.onSubmit === 'function') {
      handleSubmit()
    }
  }

  const handleSubmit = (data = {}) => {
    props.onSubmit({query, isShortMovie, ...data});
  }

  const handleSetIsShortMovie = (value) => {
    setIsShortMovie(value)
    handleSubmit({isShortMovie: value});
  }

  const handleValidationError = () => {
    if(typeof props.onError === 'function') {
      props.onError("Нужно ввести ключевое слово")
    }
  }

  useEffect(() => {
    setQuery(props.query)
  }, [props.query])
  useEffect(() => {
    setIsShortMovie(props.isShortMovie)
  }, [props.isShortMovie])

  return (
    <form className="search-form" onSubmit={handleSubmitFormEvent}>
      <Container>
        <div className="search-form__line">
          <div className="search-form__icon">
            <img src={search} alt="search icon"/>
          </div>
          <InputWithValidation
            className="search-form__input"
            placeholder="Фильм"
            required
            value={query}
            onError={handleValidationError}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-form__button">
            <img src={submitArrow} alt="find icon"/>
          </button>
        </div>

        <div className="search-form__divider"></div>
        <div className="search-form__filters">
          <div className="search-form__filter">
            <div>
              <Switch
                value={isShortMovie}
                onChange={handleSetIsShortMovie}
              >
                Короткометражка
              </Switch>
            </div>
          </div>
        </div>
      </Container>
    </form>
  );
}
