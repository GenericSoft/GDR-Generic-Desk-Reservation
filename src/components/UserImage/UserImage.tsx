type PropsType = { userImage: string; firstName: string; lastName: string };

import Container from 'react-bootstrap/Container';
import './UserImage.scss';

const UserImage = (props: PropsType) => {
  let nameLogo = '';

  if (props.firstName && props.lastName) {
    nameLogo =
      props.firstName.trim().substring(0, 1).toUpperCase() +
      props.lastName.trim().substring(0, 1).toUpperCase();
  }

  return !props.userImage ? (
    <Container className="logo-container profile-image">{nameLogo}</Container>
  ) : (
    <img
      src={props.userImage}
      className="user-image profile-image"
      alt="user photo"
    />
  );
};

export default UserImage;
