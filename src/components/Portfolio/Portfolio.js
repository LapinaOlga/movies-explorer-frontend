import './Portfolio.scss'
import {Link} from "react-router-dom";

export default function Portfolio() {
  return (
    <div className="portfolio">
      <div className="portfolio__hint">Портфолио</div>
      <div className="portfolio__achievements">
        <div className="portfolio__achievement">
          <div className="portfolio__title">Статичный сайт</div>
          <Link className="portfolio__icon"
                to="https://lapinaolga.github.io/russian-travel/"
                target="_blank"
          >
            ↗
          </Link>
        </div>
        <div className="portfolio__achievement">
          <div className="portfolio__title">Адаптивный сайт</div>
          <Link className="portfolio__icon"
                to="https://lapinaolga.github.io/mesto/"
                target="_blank"
          >
            ↗
          </Link>
        </div>
        <div className="portfolio__achievement">
          <div className="portfolio__title">Одностраничное приложение</div>
          <Link className="portfolio__icon"
                to="https://lapinaolga.github.io/russian-travel/"
                target="_blank"
          >
            ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
