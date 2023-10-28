import Container from "../Container/Container";
import './Footer.scss'
import {Link} from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container className="footer__container">
        <div className="footer__description">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </div>
        <div className="footer__divider"></div>
        <div className="footer__services">
          <div className="footer__left">
            <div className="footer__item">© {year}</div>
          </div>
          <div className="footer__right">
            <Link className="footer__item"
                  to="https://practicum.yandex.ru"
                  target="_blank"
            >
              Яндекс.Практикум
            </Link>
            <Link className="footer__item"
                  to="https://github.com"
                  target="_blank"
            >
              GitHub
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
