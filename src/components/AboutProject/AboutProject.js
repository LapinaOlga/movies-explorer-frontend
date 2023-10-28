import './AboutProject.scss'
import SectionHeader from "../SectionHeader/SectionHeader";

export default function AboutProject() {
  return (
    <div className="about-project">
      <SectionHeader>О проекте</SectionHeader>
      <div className="about-project__report">
        <div className="about-project__index">
          <div className="about-project__title">
            Дипломный проект включал 5 этапов
          </div>
          <div className="about-project__description">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </div>
        </div>
        <div className="about-project__index">
          <div className="about-project__title">
            На выполнение диплома ушло 5 недель
          </div>
          <div className="about-project__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </div>
        </div>
      </div>

      <div className="about-project__footer">
        <div className="about-project__chart">
          <div className="about-project__bar">
            <div className="about-project__back-end">
              <div className="about-project__progress about-project__progress--green">
                1 неделя
              </div>
            </div>
            <div className="about-project__front-end">
              <div className="about-project__progress about-project__progress--gray-5">
                4 недели
              </div>
            </div>
          </div>
          <div className="about-project__bar">
            <div className="about-project__back-end">
              <div className="about-project__legend">
                Back-end
              </div>
            </div>
            <div className="about-project__front-end">
              <div className="about-project__legend">
                Front-end
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
