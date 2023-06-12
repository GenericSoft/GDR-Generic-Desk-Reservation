import Container from 'react-bootstrap/Container';
type PropsType = { userImage: string; firstName: string; lastName: string };

import './UserImage.scss';

const UserImage = (props: PropsType) => {
  let nameLogo = '';

  if (props.firstName && props.lastName) {
    nameLogo =
      props.firstName.substring(0, 1).toUpperCase() +
      props.lastName.substring(0, 1).toUpperCase();
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
