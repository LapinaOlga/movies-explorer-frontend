import './SectionHeader.scss'

export default function SectionHeader(props) {
  return (
    <div className="section-title">
      <div className="section-title__text">
        {props.children}
      </div>
      <div className="section-title__divider"></div>
    </div>
  );
}
