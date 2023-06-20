import ProfileContent from '../../components/ProfileContent/ProfileContent';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Footer from '../../components/Footer/Footer';

import './Profile.scss';

const Profile = () => {
  return (
    <>
      <NavigationBar />
      <ProfileContent />
      <Footer />
    </>
  );
};
export default Profile;
