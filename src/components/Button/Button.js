import './Button.scss'
import {Link} from "react-router-dom";

export default function Button(props) {
  const classNames = ['button'];
  const variant = props.variant ?? 'primary';

  classNames.push(`button--${variant}`);

  if (props.compact !== undefined) {
    classNames.push('button--compact')
  }

  if (props.className) {
    classNames.push(props.className);
  }

  if (props.to) {
    return (
      <Link to={props.to} className={classNames.join(' ')}>
        {props.children}
      </Link>
    );
  }

  const handleClick = (e) => {
    if(typeof props.onClick === 'function') {
      props.onClick(e);
    }
  }

  return (
    <button className={classNames.join(' ')}
            type={props.type || 'button'}
            onClick={handleClick}
    >
      {props.children}
    </button>
  );
}
