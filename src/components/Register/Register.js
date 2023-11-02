import FieldList from "../FieldList/FieldList";
import Field from "../Field/Field";
import Button from "../Button/Button";
import Sign from "../Sign/Sign";
import {useContext, useEffect, useRef, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {useNavigate} from "react-router-dom";
import MainApi from "../../utils/MainApi";

export default function Register(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isInvalidForm, setIsInvalidForm] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const form = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = e.target.reportValidity();

    if (isValid) {
      setIsLoading(true);

      MainApi.register(email, password, name)
        .then(() => {
          MainApi.login(email, password)
            .then((res) => {
              if (typeof props.onSuccess === 'function') {
                props.onSuccess(res.data.token)
              }
            })
            .catch(() => {
              navigate('/signin')
            })
        })
        .catch((error) => {
          setServerError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  const handleOnInvalid = (target) => {
    const inputName = target.getAttribute('name');

    if (inputName === 'name') {
      setIsNameValid(false)
    } else if (inputName === 'email') {
      setIsEmailValid(false)
    } else {
      setIsPasswordValid(false)
    }
  }

  const handleOnValid = (target) => {
    const inputName = target.getAttribute('name');

    if (inputName === 'name') {
      setIsNameValid(true)
    } else if (inputName === 'email') {
      setIsEmailValid(true)
    } else {
      setIsPasswordValid(true)
    }
  }

  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser])

  useEffect(() => {
    setIsInvalidForm(!isNameValid || !isEmailValid || !isPasswordValid)
  }, [isNameValid, isEmailValid, isPasswordValid])

  return (
    <form ref={form} onSubmit={onSubmit}>
      <Sign
        title="Добро пожаловать!"
        submit={
          <Button variant="orange" type="submit" disabled={isInvalidForm || isLoading}>
            Зарегистрироваться {isInvalidForm}
          </Button>
        }
        links={
          <>
            <div className="sign__question">Уже зарегистрированы?</div>
            <Button variant="link-orange" to="/signin">Войти</Button>
          </>
        }
        serverError={serverError}
      >
        <FieldList>
          <Field
            name="name"
            type="text"
            minLength={2}
            maxLength={30}
            required
            autofocus
            disabled={isLoading}
            value={name}
            pattern="[a-zA-Zа-яёА-ЯË \-]+"
            onChange={(e) => setName(e.target.value)}
            onInvalid={handleOnInvalid}
            onValid={handleOnValid}
          >
            Имя
          </Field>
          <Field
            name="email"
            type="email"
            required
            disabled={isLoading}
            value={email}
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            onInvalid={handleOnInvalid}
            onValid={handleOnValid}
          >
            E-mail
          </Field>
          <Field
            name="password"
            type="password"
            required
            disabled={isLoading}
            autoComplete="current-password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onInvalid={handleOnInvalid}
            onValid={handleOnValid}
          >
            Пароль
          </Field>
        </FieldList>
      </Sign>
    </form>
  );
}
