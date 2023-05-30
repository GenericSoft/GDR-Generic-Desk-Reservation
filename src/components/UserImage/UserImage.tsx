import Container from 'react-bootstrap/Container';
type UserData = { userImage: string; firstName: string; lastName: string };

import './UserImage.scss';

const UserImage = (userData: UserData) => {
  let nameLogo = '';

  if (userData.firstName && userData.lastName) {
    nameLogo =
      userData.firstName.substring(0, 1).toUpperCase() +
      userData.lastName.substring(0, 1).toUpperCase();
  }

  return !userData.userImage ? (
    <Container className="logo-container profile-image">{nameLogo}</Container>
  ) : (
    <img
      src={userData.userImage}
      className="user-image profile-image"
      alt="user photo"
    />
  );
};

export default UserImage;
