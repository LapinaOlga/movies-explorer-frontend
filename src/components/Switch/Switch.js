import './Switch.scss'
import {useEffect, useRef} from "react";

export default function Switch(props) {
  const ref = useRef()
  const handleChange = ((e) => {
    if (props.onChange) {
      props.onChange(e.target.checked)
    }
  })

  const handleClickOnLabel = () => {
    ref.current.click();
  }

  useEffect(() => {
    ref.current.checked = Boolean(props.value);
  }, [props.value])

  return (
    <div className="switch">
      <input
        type="checkbox"
        className="switch__input"
        role="switch"
        ref={ref}
        onChange={handleChange}
      />
      <label
        className="switch__label"
        onClick={handleClickOnLabel}
      >
        {props.children}
      </label>
    </div>
  );
}
