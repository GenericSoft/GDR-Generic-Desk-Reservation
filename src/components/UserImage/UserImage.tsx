import Container from 'react-bootstrap/Container';
import './UserImage.scss';

type PropsType = {
  userImage?: string;
  firstName: string | undefined;
  lastName: string | undefined;
  color?: string;
  background?: string;
};

const UserImage = ({
  userImage,
  firstName,
  lastName,
  color,
  background,
}: PropsType) => {
  let nameLogo = '';

  if (firstName && lastName) {
    nameLogo =
      firstName.trim().substring(0, 1).toUpperCase() +
      lastName.trim().substring(0, 1).toUpperCase();
  }

  return !userImage ? (
    <Container
      className="logo-container profile-image"
      style={{ color: color, background: background }}
    >
      {nameLogo}
    </Container>
  ) : (
    <img
      src={userImage}
      className="user-image profile-image"
      alt="user photo"
    />
  );
};

export default UserImage;
