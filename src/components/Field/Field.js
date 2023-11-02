import './Field.scss'
import {useEffect, useState} from "react";
import InputWithValidation from "../InputWithValidation/InputWithValidation";

export default function Field(props) {
  const [feedback, setFeedback] = useState(props.feedback)
  const [classNames, setClassNames] = useState(['field'])

  useEffect(() => {
    if (props.isInvalid) {
      setClassNames(['field', 'field--invalid'])
    } else {
      setClassNames(['field'])
    }
    setFeedback(props.feedback);
  }, [props.isInvalid])

  const handleInvalid = (target) => {
    setFeedback(target.validationMessage)
    setClassNames(['field', 'field--invalid'])

    if (typeof props.onInvalid === 'function') {
      props.onInvalid(target);
    }
  }

  const hideValidationError = (target) => {
    setFeedback(props.feedback)
    setClassNames(['field'])

    if (typeof props.onValid === 'function') {
      props.onValid(target);
    }
  }

  const handleBlur = (e) => {
    const isValid = e.target.checkValidity();

    if (isValid) {
      hideValidationError(e.target)
    }

    if (typeof props.onBlur === 'function') {
      props.onBlur(e);
    }
  }

  const handleInput = (e) => {
    const isValid = e.target.checkValidity();

    if (isValid) {
      hideValidationError(e.target)
    }

    if (typeof props.onInput === 'function') {
      props.onInput(e);
    }
  }

  const handleChange = (e) => {
    e.target.checkValidity()

    if (typeof props.onChange === 'function') {
      props.onChange(e);
    }
  }

  return (
    <div className={classNames.join(' ')}>
      <div className="field__label">{props.children}</div>
      <InputWithValidation
        className="field__input"
        placeholder={props.placeholder}
        type={props.type || 'text'}
        name={props.name}
        required={props.required}
        disabled={props.disabled}
        autoComplete={props.autoComplete}
        minLength={props.minLength}
        maxLength={props.maxLength}
        pattern={props.pattern}
        value={props.value}
        autofocus={props.autofocus}
        isRealTimeValidation={true}
        onInvalid={handleInvalid}
        onBlur={handleBlur}
        onInput={handleInput}
        onChange={handleChange}
        onError={handleInvalid}
        onSuccess={hideValidationError}
      />
      {feedback && <div className="field__feedback">{feedback}</div>}
    </div>
  );
}
