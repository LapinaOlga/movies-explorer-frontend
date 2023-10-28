import FieldList from "../FieldList/FieldList";
import Field from "../Field/Field";
import Button from "../Button/Button";
import Sign from "../Sign/Sign";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {useNavigate} from "react-router-dom";

export default function Register(props) {
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
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser])

  return (
    <form onSubmit={onSubmit}>
      <Sign
        title="Добро пожаловать!"
        submit={
          <Button variant="orange" type="submit">Зарегистрироваться</Button>
        }
        links={
          <>
            <div className="sign__question">Уже зарегистрированы?</div>
            <Button variant="link-orange" to="/sign-in">Войти</Button>
          </>
        }
      >
        <FieldList>
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
          <Field type="password"
                 disabled={isLoading}
                 autocomplete="current-password"
                 minLength={8}
                 feedback={error}
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
          >
            Пароль
          </Field>
        </FieldList>
      </Sign>
    </form>
  );
}
