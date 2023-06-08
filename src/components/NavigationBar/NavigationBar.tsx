import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import DropDown from '../DropDown/DropDown';
import UserImage from '../UserImage/UserImage';

import './NavigationBar.scss';
import logo from '../../resources/images/GenericSoft_Logo_White.svg';
import { useAppSelector } from '../../redux/store';
import ReserveDeskButton from '../ReserveDeskButton/ReserveDeskButton';

const NavigationBar = () => {
  const currentUser = useAppSelector((state) => state.user);

  return (
    <Navbar className="nav">
      <Container>
        <Navbar.Brand className="justify-content-center nav__logo-container">
          <img
            src={logo}
            width="90"
            height="90"
            className="d-inline-block align-top nav__logo-image"
            alt="Generic logo"
          />
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end nav__user-data">
          <ReserveDeskButton />
          <Navbar.Text className="nav__user-data--name">
            {currentUser.firstName}
          </Navbar.Text>

          <DropDown
            firstName={currentUser.firstName || ''}
            lastName={currentUser.lastName || ''}
            image={currentUser.profilePic || ''}
            email={currentUser.email}
          />

          <UserImage
            userImage={currentUser.profilePic || ''}
            firstName={currentUser.firstName || ''}
            lastName={currentUser.lastName || ''}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavigationBar;
