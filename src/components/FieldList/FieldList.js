import './FieldList.scss'

export default function FieldList(props) {
  const classNames = ['field-list'];

  if (props.className) {
    classNames.push(props.className);
  }

  return (
    <div className={classNames.join(' ')}>
      {props.children}
    </div>
  );
}
