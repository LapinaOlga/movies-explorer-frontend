import {useEffect, useRef} from "react";

export default function InputWithValidation(props) {
  const ref = useRef();
  const isRealTimeValidation = props.isRealTimeValidation || false

  const handleInvalid = (e) => {
    e.preventDefault();

    if (props.onError) {
      props.onError(e.target.validationMessage)
    }
  }

  const hideValidationError = () => {
    if (typeof props.onSuccess === 'function') {
      props.onSuccess()
    }
  }

  const handleBlur = (e) => {
    const isValid = e.target.checkValidity();

    if (isValid) {
      hideValidationError()
    }

    if (typeof props.onBlur === 'function') {
      props.onBlur(e);
    }
  }

  const handleInput = (e) => {
    const isValid = e.target.checkValidity();

    if (isValid) {
      hideValidationError()
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

  useEffect(() => {
    if (isRealTimeValidation) {
      ref.current.checkValidity();
    }
  }, []);

  return (
    <input
      ref={ref}
      className={props.className}
      placeholder={props.placeholder}
      type={props.type || 'text'}
      name={props.name}
      required={props.required}
      disabled={props.disabled}
      autoComplete={props.autocomplete}
      minLength={props.minLength}
      maxLength={props.maxLength}
      autoFocus={props.autofocus}
      value={props.value}
      pattern={props.pattern}
      onInvalid={handleInvalid}
      onBlur={handleBlur}
      onInput={handleInput}
      onChange={handleChange}
    />
  );
}
