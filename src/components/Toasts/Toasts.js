import './Toasts.scss'
import cross from '../../images/cross.svg'

export default function Toasts(props) {
  if (!props.list.length) {
    return (
      <></>
    );
  }

  let list = [];
  props.list.map((toast) => {
    list.push(
      <div className={`toast toast--${toast.getType()}`} key={toast.getId()}>
        <div className="toast__content">
          <div className="toast__title">{toast.getTitle()}</div>
          <div className="toast__message">{toast.getMessage()}</div>
        </div>
      </div>
    )
  })

  return (
    <div className="toasts">{list}</div>
  );
}
