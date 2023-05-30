import Container from 'react-bootstrap/Container';

import { useAppSelector } from '../../redux/store';

import ProfileCard from '../../components/ProfileCard/ProfileCard';

import './Profile.scss';
import ProfileContent from '../../components/ProfileContent/ProfileContent';
const Profile = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <Container fluid className="profile-container">
      <Container className="profile-container__profile-card">
        <ProfileCard
          firstName={user.firstName || ''}
          lastName={user.lastName || ''}
          userImage={user.profilePic || ''}
          email={user.email}
        />
      </Container>
      <Container className="profile-container__profile-content">
        <ProfileContent
          firstName={user.firstName || ''}
          lastName={user.lastName || ''}
          email={user.email}
        />
      </Container>
    </Container>
  );
};
export default Profile;
