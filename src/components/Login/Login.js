import FieldList from "../FieldList/FieldList";
import Field from "../Field/Field";
import Button from "../Button/Button";
import Sign from "../Sign/Sign";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {useNavigate} from "react-router-dom";

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const isValid = e.target.reportValidity();

    if (isValid) {
      setIsLoading(true);
      props.onSubmit({email, password}, (errorMessage) => {
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
    <form onSubmit={handleSubmitForm}>
      <Sign
        title="Рады видеть!"
        submit={
          <Button variant="orange" type="submit">
            Войти
          </Button>
        }
        links={
          <>
            <div className="sign__question">Ещё не зарегистрированы?</div>
            <Button variant="link-orange" to="/sign-up">Регистрация</Button>
          </>
        }
      >
        <FieldList>
          <Field type="email"
                 required
                 disabled={isLoading}
                 autocomplete="username"
                 onChange={(e) => setEmail(e.target.value)}
          >
            E-mail
          </Field>
          <Field type="password"
                 disabled={isLoading}
                 autocomplete="current-password"
                 minLength={8}
                 isInvalid={!!error}
                 feedback={error}
                 onChange={(e) => setPassword(e.target.value)}
          >
            Пароль
          </Field>
        </FieldList>
      </Sign>
    </form>
  );
}
