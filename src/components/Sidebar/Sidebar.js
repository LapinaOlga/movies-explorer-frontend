import './Sidebar.scss'
import cross from '../../images/cross.svg'
import {useEffect} from "react";

export default function Sidebar(props) {
  const classNames = ['sidebar'];

  if (props.shown) {
    classNames.push('sidebar--shown');
  }

  useEffect(() => {
    document.body.style.overflow = props.shown ? 'hidden' : 'visible'
  }, [props.shown])

  const onHide = () => {
    if (typeof props.onHide === 'function') {
      props.onHide();
    }
  }

  return (
    <div className={classNames.join(' ')}>
      <div className="sidebar__content">
        <div className="sidebar__header">
          <button className="sidebar__close" onClick={onHide}>
            <img src={cross} alt="close sidebar" className="sidebar__cross"/>
          </button>
        </div>

        <div className="sidebar__body">
          {props.children}
        </div>

        {props.footer &&
          <div className="sidebar__footer">
            {props.footer}
          </div>
        }
      </div>
    </div>
  );
}
