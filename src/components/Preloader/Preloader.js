import Spinner from "../Spinner/Spinner";
import './Preloader.scss'

export default function Preloader() {
  return (
    <div className="preloader">
      <Spinner/>
    </div>
  );
}
