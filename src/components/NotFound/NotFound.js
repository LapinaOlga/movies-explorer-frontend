import './NotFound.scss'
import Container from "../Container/Container";
import Button from "../Button/Button";
import {useNavigate} from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <Container>
        <div className="not-found__content">
          <div className="not-found__row"></div>
          <div className="not-found__row not-found__row--center">
            <div className="not-found__title">404</div>
            <div className="not-found__description">
              Страница не найдена
            </div>
          </div>
          <div className="not-found__row not-found__row--end">
            <Button
              variant="link-orange"
              onClick={() => navigate(-1)}
            >
              Назад
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
