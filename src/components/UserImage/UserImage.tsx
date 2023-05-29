type UserData = { userImage: string; nameLogo: string };

import './UserImage.scss';

const UserImage = (userData: UserData) => {
  return !userData.userImage ? (
    <div className="logo-container">{userData.nameLogo}</div>
  ) : (
    <img src={userData.userImage} className="user-image" alt="user photo" />
  );
};

export default UserImage;
