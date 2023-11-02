import Button from "../Button/Button";
import userIcon from "../../images/user.svg";
import './ProfileButton.scss'

export default function ProfileButton(props) {
  const classNames = ['profile-button']

  if (props.variant === 'white') {
    classNames.push(`profile-button--${props.variant}`)
  } else {
    classNames.push(`profile-button--black`)
  }

  return (
    <Button
      className={classNames.join(' ')}
      variant="transparent"
      to="/profile"
    >
      <div className="profile-button__label">Аккаунт</div>
      <div className="profile-button__icon">
        <img src={userIcon} alt="user icon"/>
      </div>
    </Button>
  );
}
