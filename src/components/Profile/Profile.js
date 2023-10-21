import './Profile.scss'
import Container from "../Container/Container";
import Button from "../Button/Button";
import Header from "../Header/Header";
import {useContext, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {useNavigate} from "react-router-dom";

export default function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/profile/edit')
  }

  const handleLogout = () => {
    if (props.onLogout) {
      props.onLogout()
    }
  }

  return (
    <>
      <Header/>
      <main className="profile">
        <Container className="profile__container">
          <div className="profile__content">
            <div className="profile__title">Привет, {currentUser.name}!</div>
            <div className="profile__fields">
              <div className="profile__field">
                <div className="profile__label">Имя</div>
                <div className="profile__value">{currentUser.name}</div>
              </div>
              <div className="profile__divider"></div>
              <div className="profile__field">
                <div className="profile__label">E-mail</div>
                <div className="profile__value">{currentUser.email}</div>
              </div>
            </div>
            <div className="profile__buttons">
              <Button variant="link-black" onClick={handleEditClick}>
                Редактировать
              </Button>
              <Button variant="link-red" onClick={handleLogout}>
                Выйти из аккаунта
              </Button>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
