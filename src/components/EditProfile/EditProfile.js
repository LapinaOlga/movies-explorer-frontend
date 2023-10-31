import FieldList from "../FieldList/FieldList";
import Field from "../Field/Field";
import Button from "../Button/Button";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {useNavigate} from "react-router-dom";
import Header from "../Header/Header";
import Container from "../Container/Container";
import './EditProfile.scss'
import MainApi from "../../utils/MainApi";
import Toast from "../../utils/Toast";

export default function EditProfile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(currentUser.email);
  const [name, setName] = useState(currentUser.name);
  const [isInvalidForm, setIsInvalidForm] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = e.target.reportValidity();

    if (isValid) {
      setIsLoading(true);

      MainApi.patchMe({name, email})
        .then((res) => {
          if (typeof props.onSuccess === 'function') {
            props.onSuccess(res.data);
          }

          navigate('/profile')
        })
        .catch((error) => {
          if (typeof props.addToast === 'function') {
            props.addToast(new Toast('red', error.message))
          }
        })
    }
  }

  const handleOnInvalid = () => {
    setIsInvalidForm(true);
  }

  const handleOnValid = () => {
    setIsInvalidForm(false);
  }

  useEffect(() => {
    if (!currentUser) {
      navigate('/signin')
    }
  }, [currentUser])

  return (
    <>
      <Header/>
      <main className="edit-profile">
        <Container className="edit-profile__container">
          <form onSubmit={onSubmit} className="edit-profile__form">
            <div className="edit-profile__content">
              <div className="edit-profile__title">Изменение профиля</div>
              <FieldList className="edit-profile__fields">
                <Field type="text"
                       minLength={2}
                       maxLength={30}
                       required
                       disabled={isLoading}
                       value={name}
                       pattern="[a-zA-Zа-яёА-ЯË \-]+"
                       onChange={(e) => setName(e.target.value)}
                       onInvalid={handleOnInvalid}
                       onValid={handleOnValid}
                >
                  Имя
                </Field>
                <Field type="email"
                       required
                       disabled={isLoading}
                       value={email}
                       autocomplete="username"
                       onChange={(e) => setEmail(e.target.value)}
                       onInvalid={handleOnInvalid}
                       onValid={handleOnValid}
                >
                  E-mail
                </Field>
              </FieldList>
              <div className="edit-profile__buttons">
                <Button variant="orange" type="submit" disabled={isInvalidForm}>Сохранить</Button>
                <Button to="/profile" variant="link-orange">Назад</Button>
              </div>
            </div>
          </form>
        </Container>
      </main>
    </>
  );
}
