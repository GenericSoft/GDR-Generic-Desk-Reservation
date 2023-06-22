import Container from 'react-bootstrap/Container';

import { useState } from 'react';

import ProfileCard from '../../components/ProfileCard/ProfileCard';

import './Profile.scss';
import ProfileContent from '../../components/ProfileContent/ProfileContent';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Footer from '../../components/Footer/Footer';

let initialImageState: File;

const Profile = () => {
  const [isProfileInEditMode, setIsProfileInEditMode] = useState(true);
  const [chooseImage, setChooseImage] = useState(initialImageState);
  const [instantPhoto, setInstantPhoto] = useState<string>('');
  const [loading, setLoading] = useState('');

  const changeProfileEditMode = (isInEditMode: boolean) => {
    if (isInEditMode) {
      setChooseImage(initialImageState);
      setInstantPhoto('');
    }
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
            setChooseImage={setChooseImage}
            setInstantPhoto={setInstantPhoto}
            instantPhoto={instantPhoto}
            setLoading={setLoading}
            loading={loading}
          />
        </Container>
        <Container className="profile-container__profile-content">
          <ProfileContent
            isProfileInEditMode={isProfileInEditMode}
            cancelEditClick={changeProfileEditMode}
            chooseImage={chooseImage}
            setChooseImage={setChooseImage}
            setLoading={setLoading}
          />
        </Container>
      </Container>
      <Footer />
    </>
  );
};
export default Profile;
