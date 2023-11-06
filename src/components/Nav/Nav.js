import './Nav.scss'
import {Link, useLocation} from "react-router-dom";
import {NAVIGATION_LINKS} from "../../config/app";

export default function Nav(props) {
  const classNames = ['nav'];

  if (props.variant) {
    classNames.push(`nav--${props.variant}`)
  } else {
    classNames.push('nav--white');
  }

  if ('vertical' in props) {
    classNames.push(`nav--vertical`)
  } else {
    classNames.push('nav--horizontal');
  }

  const location = useLocation();
  const children = [];

  for (const item of NAVIGATION_LINKS) {
    if (props.noIndexPage && item.to === '/') {
      continue;
    }

    const classNames = ['nav__item']

    if (location.pathname === item.to) {
      classNames.push('nav__item--active')
    }

    children.push(
      <li className={classNames.join(' ')} key={item.to}>
        <Link to={item.to} className="nav__link">
          {item.title}
        </Link>
      </li>
    )
  }

  return (
    <ul className={classNames.join(' ')}>
      {children}
    </ul>
  );
}
