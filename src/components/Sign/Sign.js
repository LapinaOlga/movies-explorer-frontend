import Container from "../Container/Container";
import logo from "../../images/logo.svg";
import './Sign.scss'
import {Link} from "react-router-dom";

export default function Sign(props) {
  return (
    <>
      <main className="sign">
        <Container>
          <div className="sign__content">
            <div className="sign__logo">
              <Link to="/">
                <img src={logo} alt="logo"/>
              </Link>
            </div>
            <div className="sign__title">
              {props.title}
            </div>
            <div className="sign__body">
              {props.children}
            </div>
            <div className="sign__footer">
              {props.submit}
              <div className="sign__links">
                {props.links}
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
