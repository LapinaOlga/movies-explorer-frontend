import {useEffect, useRef} from "react";

export default function InputWithValidation(props) {
  const ref = useRef();
  const isRealTimeValidation = props.isRealTimeValidation || false

  const handleInvalid = (e) => {
    e.preventDefault();

    if (props.onError) {
      props.onError(e.target)
    }
  }

  const handleSuccess = (target) => {
    if (typeof props.onSuccess === 'function') {
      props.onSuccess(target)
    }
  }

  const handleBlur = (e) => {
    if (isRealTimeValidation) {
      const isValid = e.target.checkValidity();

      if (isValid) {
        handleSuccess(e.target)
      }
    }

    if (typeof props.onBlur === 'function') {
      props.onBlur(e);
    }
  }

  const handleInput = (e) => {
    if (isRealTimeValidation) {
      const isValid = e.target.checkValidity();

      if (isValid) {
        handleSuccess(e.target)
      }
    }

    if (typeof props.onInput === 'function') {
      props.onInput(e);
    }
  }

  const handleChange = (e) => {
    if (isRealTimeValidation) {
      e.target.checkValidity()
    }

    if (typeof props.onChange === 'function') {
      props.onChange(e);
    }
  }

  useEffect(() => {
    if (isRealTimeValidation) {
      ref.current.checkValidity();
    }
  }, []);

  useEffect(() => {
    if (isRealTimeValidation) {
      const isValid = ref.current.checkValidity();

      if (isValid) {
        handleSuccess(ref.current)
      }
    }
  }, [props.value]);

  return (
    <input
      ref={ref}
      className={props.className}
      placeholder={props.placeholder}
      type={props.type || 'text'}
      name={props.name}
      required={props.required}
      disabled={props.disabled}
      autoComplete={props.autoComplete}
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
