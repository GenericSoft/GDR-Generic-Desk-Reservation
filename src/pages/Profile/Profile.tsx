import Container from 'react-bootstrap/Container';

import { useState } from 'react';

import ProfileCard from '../../components/ProfileCard/ProfileCard';

import './Profile.scss';
import ProfileContent from '../../components/ProfileContent/ProfileContent';

const Profile = () => {
  const [isProfileInEditMode, setIsProfileInEditMode] = useState(true);

  const changeProfileEditMode = (isInEditMode: boolean) => {
    setIsProfileInEditMode(isInEditMode);
  };
  return (
    <Container fluid className="profile-container">
      <Container className="profile-container__profile-card">
        <ProfileCard activeEditClick={changeProfileEditMode} />
      </Container>
      <Container className="profile-container__profile-content">
        <ProfileContent
          isProfileInEditMode={isProfileInEditMode}
          cancelEditClick={changeProfileEditMode}
        />
      </Container>
    </Container>
  );
};
export default Profile;
