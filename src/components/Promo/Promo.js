import './Promo.scss'
import globe from '../../images/globe.svg'
import Button from "../Button/Button";

export default function Promo(props) {
  const handleClickToLearnMore = (e) => {
    if (typeof props.onClickLearnMore === 'function') {
      props.onClickLearnMore(e);
    }
  }

  return (
    <div className="promo">
      <div>
        <div className="promo__title">
          Учебный проект студента факультета Веб&#8209;разработки.
        </div>
        <div className="promo__hint">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </div>
        <div className="promo__action">
          <Button variant="outline-white" onClick={handleClickToLearnMore}>Узнать больше</Button>
        </div>
      </div>
      <div>
        <img src={globe} alt="globe" className="promo__globe"/>
      </div>
    </div>
  );
}
