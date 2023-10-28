import './Container.scss'

export default function Container(props) {
  const classNames = ['container'];

  if (props.className) {
    classNames.push(props.className);
  }

  return (
    <div className={classNames.join(' ')}>
      {props.children}
    </div>
  );
}
