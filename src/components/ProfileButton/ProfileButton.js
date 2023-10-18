import Button from "../Button/Button";
import userIcon from "../../images/user.svg";
import './ProfileButton.scss'

export default function ProfileButton(props) {
  const classNames = ['profile-button']
  let iconButtonVariant;

  if(props.variant === 'white') {
    classNames.push(`profile-button--${props.variant}`)
    iconButtonVariant = 'green';
  } else {
    classNames.push(`profile-button--black`)
    iconButtonVariant = 'gray-3';
  }

  return (
    <Button className={classNames.join(' ')}
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
