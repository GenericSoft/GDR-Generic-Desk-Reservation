import Container from 'react-bootstrap/Container';

import { useAppSelector } from '../../redux/store';
import { useState } from 'react';

import ProfileCard from '../../components/ProfileCard/ProfileCard';

import './Profile.scss';
import ProfileContent from '../../components/ProfileContent/ProfileContent';
const Profile = () => {
  const user = useAppSelector((state) => state.user);

  const [readOnlyValue, setReadOnlyValue] = useState(true);

  const editClick = () => {
    setReadOnlyValue((currentState) => !currentState);
  };
  return (
    <Container fluid className="profile-container">
      <Container className="profile-container__profile-card">
        <ProfileCard
          firstName={user.firstName || ''}
          lastName={user.lastName || ''}
          userImage={user.profilePic || ''}
          email={user.email}
          onClick={editClick}
        />
      </Container>
      <Container className="profile-container__profile-content">
        <ProfileContent
          firstName={user.firstName || ''}
          lastName={user.lastName || ''}
          jobRole={user.jobRole || ''}
          email={user.email}
          userId={user.userId}
          readOnlyValue={readOnlyValue}
        />
      </Container>
    </Container>
  );
};
export default Profile;
