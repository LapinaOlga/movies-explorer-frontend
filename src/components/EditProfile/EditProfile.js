import FieldList from "../FieldList/FieldList";
import Field from "../Field/Field";
import Button from "../Button/Button";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {useNavigate} from "react-router-dom";
import Header from "../Header/Header";
import Container from "../Container/Container";
import './EditProfile.scss'

export default function EditProfile(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = e.target.reportValidity();

    if (isValid) {
      setIsLoading(true);
      props.onSubmit({email, password, name}, (errorMessage) => {
        setError(errorMessage);
      })
    }
  }

  useEffect(() => {
    if (!currentUser) {
      navigate('/sign-in')
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
                       onChange={(e) => setName(e.target.value)}
                >
                  Имя
                </Field>
                <Field type="email"
                       required
                       disabled={isLoading}
                       value={email}
                       autocomplete="username"
                       onChange={(e) => setEmail(e.target.value)}
                >
                  E-mail
                </Field>
              </FieldList>
              <div className="edit-profile__buttons">
                <Button variant="orange" type="submit">Сохранить</Button>
                <Button to="/profile" variant="link-orange">Назад</Button>
              </div>
            </div>
          </form>
        </Container>
      </main>
    </>
  );
}
