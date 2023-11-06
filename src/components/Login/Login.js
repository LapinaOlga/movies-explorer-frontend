import FieldList from "../FieldList/FieldList";
import Field from "../Field/Field";
import Button from "../Button/Button";
import Sign from "../Sign/Sign";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {useNavigate} from "react-router-dom";
import MainApi from "../../utils/MainApi";
import {EMAIL_PATTERN} from "../../config/app";

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalidForm, setIsInvalidForm] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const isValid = e.target.reportValidity();

    if (isValid) {
      setIsLoading(true);

      MainApi.login(email, password)
        .then((response) => {
          if (typeof props.onSuccess === 'function') {
            props.onSuccess(response.data.token)
          }
        })
        .catch((error) => {
          setServerError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  }

  const handleOnInvalid = (target) => {
    const inputName = target.getAttribute('name');

    if (inputName === 'email') {
      setIsEmailValid(false)
    } else {
      setIsPasswordValid(false)
    }
  }

  const handleOnValid = (target) => {
    const inputName = target.getAttribute('name');

    if (inputName === 'email') {
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
    setIsInvalidForm(!isEmailValid || !isPasswordValid)
  }, [isEmailValid, isPasswordValid])

  return (
    <form onSubmit={handleSubmitForm}>
      <Sign
        title="Рады видеть!"
        submit={
          <Button variant="orange" type="submit" disabled={isInvalidForm || isLoading}>
            Войти
          </Button>
        }
        links={
          <>
            <div className="sign__question">Ещё не зарегистрированы?</div>
            <Button variant="link-orange" to="/signup">Регистрация</Button>
          </>
        }
      >
        <FieldList>
          <Field
            name="email"
            type="email"
            required
            disabled={isLoading}
            autoComplete="username"
            pattern={EMAIL_PATTERN}
            defaultValidationMessage="Пожалуйста укажите валидный email"
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
            isInvalid={!!serverError}
            feedback={serverError}
            onChange={(e) => {
              setPassword(e.target.value);
              setServerError(null)
            }}
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
