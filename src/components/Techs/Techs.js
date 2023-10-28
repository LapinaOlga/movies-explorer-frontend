import './Techs.scss'
import SectionHeader from "../SectionHeader/SectionHeader";

export default function Techs() {
  return (
    <div className="techs">
      <SectionHeader>Технологии</SectionHeader>
      <div className="techs__title">7 технологий</div>
      <div className="techs__description">
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </div>
      <div className="techs__tags">
        <div className="techs__tag">HTML</div>
        <div className="techs__tag">CSS</div>
        <div className="techs__tag">JS</div>
        <div className="techs__tag">React</div>
        <div className="techs__tag">Git</div>
        <div className="techs__tag">Express.js</div>
        <div className="techs__tag">mongoDB</div>
      </div>
    </div>
  );
}
