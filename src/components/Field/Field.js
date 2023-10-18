import './Field.scss'
import {useEffect, useState} from "react";

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

  const handleInvalid = (e) => {
    e.preventDefault();
    setFeedback(e.target.validationMessage)
    setClassNames(['field', 'field--invalid'])
  }

  const hideValidationError = () => {
    setFeedback(props.feedback)
    setClassNames(['field'])
  }

  const handleBlur = (e) => {
    hideValidationError()
    if (props.onBlur) {
      props.onBlur(e);
    }
  }

  const handleInput = (e) => {
    hideValidationError()
    if (props.onInput) {
      props.onInput(e);
    }
  }

  const handleChange = (e) => {
    if (props.onChange) {
      props.onChange(e);
    }
  }

  return (
    <div className={classNames.join(' ')}>
      <div className="field__label">{props.children}</div>
      <input
        className="field__input"
        placeholder={props.placeholder}
        type={props.type || 'text'}
        name={props.name}
        required={props.required}
        disabled={props.disabled}
        autoComplete={props.autocomplete}
        minLength={props.minLength}
        maxLength={props.maxLength}
        value={props.value}
        onInvalid={handleInvalid}
        onBlur={handleBlur}
        onInput={handleInput}
        onChange={handleChange}
      />
      {feedback && <div className="field__feedback">{feedback}</div>}
    </div>
  );
}
