import './Header.scss'
import Container from "../Container/Container";
import logo from '../../images/logo.svg'
import Button from "../Button/Button";
import sandwich from '../../images/sandwich.svg'
import Sidebar from "../Sidebar/Sidebar";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {Link, useLocation} from "react-router-dom";
import Nav from "../Nav/Nav";
import ProfileButton from "../ProfileButton/ProfileButton";

export default function Header(props) {
  const classNames = ['header'];
  let profileIconVariant = 'gray-3'

  if (props.variant === 'primary') {
    classNames.push('header--primary');
    profileIconVariant = 'white'
  }

  const currentUser = useContext(CurrentUserContext);
  const [hasSidebarOpened, setHasSidebarOpened] = useState(false);

  const showSidebar = () => {
    setHasSidebarOpened(true)
  }

  const hideSidebar = () => {
    setHasSidebarOpened(false)
  }

  const location = useLocation();
  useEffect(() => hideSidebar, [location]);

  return (
    <header className={classNames.join(' ')}>
      <Container className="header__container">
        <div className="header__left">
          <Link to="/">
            <img src={logo} alt="logo"/>
          </Link>

          {currentUser &&
            <Nav variant={props.variant === 'primary' ? 'white' : 'black'}
                 noIndexPage
            />
          }
        </div>
        <div className="header__right">
          {currentUser &&
            <div className="header__dektop">
              <ProfileButton variant={profileIconVariant} />
            </div>
          }
          {currentUser &&
            <div className="header__not-dektop">
              <Button className="header__sandwitch" variant="transparent" onClick={showSidebar}>
                <img src={sandwich} alt="navigation"/>
              </Button>
              <Sidebar shown={hasSidebarOpened}
                       onHide={hideSidebar}
                       footer={
                         <ProfileButton variant="gray-3" />
                       }
              >
                <Nav variant="black" vertical/>
              </Sidebar>
            </div>
          }
          {!currentUser &&
            <>
              <Button variant="transparent" to="/signup">
                Регистрация
              </Button>
              <Button variant="green" to="/signin">
                Войти
              </Button>
            </>
          }
        </div>
        {/*<Sidebar/>*/}
      </Container>
    </header>
  );
}
