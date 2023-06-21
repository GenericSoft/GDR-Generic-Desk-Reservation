import Container from 'react-bootstrap/Container';

import { useState } from 'react';

import ProfileCard from '../../components/ProfileCard/ProfileCard';

import './Profile.scss';
import ProfileContent from '../../components/ProfileContent/ProfileContent';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Footer from '../../components/Footer/Footer';

const Profile = () => {
  const [isProfileInEditMode, setIsProfileInEditMode] = useState(true);

  const changeProfileEditMode = (isInEditMode: boolean) => {
    setIsProfileInEditMode(isInEditMode);
  };
  return (
    <>
      <NavigationBar />
      <Container fluid className="profile-container">
        <Container className="profile-container__profile-card">
          <ProfileCard
            activeEditClick={changeProfileEditMode}
            isProfileInEditMode={isProfileInEditMode}
          />
        </Container>
        <Container className="profile-container__profile-content">
          <ProfileContent
            isProfileInEditMode={isProfileInEditMode}
            cancelEditClick={changeProfileEditMode}
          />
        </Container>
      </Container>
      <Footer />
    </>
  );
};
export default Profile;
