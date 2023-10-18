import SectionHeader from "../SectionHeader/SectionHeader";
import student from '../../images/student.png';
import './AboutMe.scss'

export default function AboutMe() {
  return (
    <div className="about-me">
      <SectionHeader>Студент</SectionHeader>
      <div className="about-me__content">
        <div>
          <div className="about-me__name">Виталий</div>
          <div className="about-me__position">
            Фронтенд-разработчик, 30 лет
          </div>
          <div className="about-me__summary">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании
            «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с
            постоянной работы.
          </div>
          <div className="about-me__github">
            GitHub
          </div>
        </div>
        <div>
          <img src={student} alt="student photo" className="about-me__photo"/>
        </div>
      </div>
    </div>
  );
}
