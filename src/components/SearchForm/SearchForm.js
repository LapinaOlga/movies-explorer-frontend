import './SearchForm.scss'
import Container from "../Container/Container";
import search from '../../images/search.svg'
import submitArrow from '../../images/submit-arrow.svg'
import Switch from "../Switch/Switch";

export default function SearchForm() {
  return (
    <div className="search-form">
      <Container>
        <div className="search-form__line">
          <div className="search-form__icon">
            <img src={search} alt="search icon"/>
          </div>
          <input className="search-form__input"
                 placeholder="Фильм"
          />
          <button className="search-form__button">
            <img src={submitArrow} alt="find icon"/>
          </button>
        </div>

        <div className="search-form__divider"></div>
        <div className="search-form__filters">
          <div className="search-form__filter">
            <div>
              <Switch>Короткометражка</Switch>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
