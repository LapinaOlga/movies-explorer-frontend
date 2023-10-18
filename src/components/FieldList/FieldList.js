import './FieldList.scss'

export default function FieldList(props) {
  return (
    <div className="field-list">
      {props.children}
    </div>
  );
}
