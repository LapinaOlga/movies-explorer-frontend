import './Switch.scss'

export default function Switch(props) {
  return (
    <div className="switch switch--active">
      <input type="checkbox" className="switch__input"/>
      <div className="switch__fake"></div>
      <label className="switch__label">{props.children}</label>
    </div>
  );
}
