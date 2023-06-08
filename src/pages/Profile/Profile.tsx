import Container from 'react-bootstrap/Container';

import { useState } from 'react';

import ProfileCard from '../../components/ProfileCard/ProfileCard';

import './Profile.scss';
import ProfileContent from '../../components/ProfileContent/ProfileContent';

const Profile = () => {
  const [isProfileInEditMode, setIsProfileInEditMode] = useState(true);

  const editClick = () => {
    setIsProfileInEditMode(false);
  };
  const cancelEditClick = () => {
    setIsProfileInEditMode(true);
  };
  return (
    <Container fluid className="profile-container">
      <Container className="profile-container__profile-card">
        <ProfileCard activeEditClick={editClick} />
      </Container>
      <Container className="profile-container__profile-content">
        <ProfileContent
          isProfileInEditMode={isProfileInEditMode}
          cancelEditClick={cancelEditClick}
        />
      </Container>
    </Container>
  );
};
export default Profile;
