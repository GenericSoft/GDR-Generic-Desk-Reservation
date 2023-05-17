import Container from 'react-bootstrap/Container';
type UserData = { userImage: string; nameLogo: string };

import './UserImage.scss';

const UserImage = (userData: UserData) => {
  return !userData.userImage ? (
    <Container className="logo-container">{userData.nameLogo}</Container>
  ) : (
    <img src={userData.userImage} className="user-image" alt="user photo" />
  );
};

export default UserImage;
