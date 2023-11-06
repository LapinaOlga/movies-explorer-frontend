import {useEffect, useRef, useState} from "react";

export default function InputWithValidation(props) {
  const ref = useRef();
  const isRealTimeValidation = props.isRealTimeValidation || false
  const [pattern, setPattern] = useState(null)

  const handleInvalid = (e) => {
    e.preventDefault();

    handleError(e.target)
  }

  const handleError = (target) => {
    if (typeof props.onError === 'function') {
      props.onError(target)
    }
  }

  const handleSuccess = (target) => {
    if (typeof props.onSuccess === 'function') {
      props.onSuccess(target)
    }
  }

  const handleBlur = (e) => {
    if (typeof props.onBlur === 'function') {
      props.onBlur(e);
    }

    checkRealtimeValidation()
  }

  const handleInput = (e) => {
    if (typeof props.onInput === 'function') {
      props.onInput(e);
    }

    checkRealtimeValidation()
  }

  const handleChange = (e) => {
    if (typeof props.onChange === 'function') {
      props.onChange(e);
    }

    checkRealtimeValidation()
  }

  const checkRealtimeValidation = () => {
    if (isRealTimeValidation) {
      const isValid = ref.current.checkValidity();

      if (isValid) {
        if (typeof props.value === 'string'
          && typeof props.pattern === 'object'
          && props.pattern instanceof RegExp
        ) {
          const regex = props.pattern

          if (props.value.match(regex)) {
            handleSuccess(ref.current)
          } else {
            handleError(ref.current)
          }
        } else {
          handleSuccess(ref.current)
        }
      } else {
        handleError(ref.current)
      }
    }
  }

  useEffect(() => {
    if (typeof props.pattern === 'string') {
      setPattern(props.pattern)
    } else {
      setPattern(null)
    }
  }, [props.pattern])

  useEffect(checkRealtimeValidation, [props.value]);
  useEffect(checkRealtimeValidation, []);

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
      pattern={pattern}
      onInvalid={handleInvalid}
      onBlur={handleBlur}
      onInput={handleInput}
      onChange={handleChange}
    />
  );
}
