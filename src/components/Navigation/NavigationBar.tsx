import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import './NavigationBar.scss';
import logo from '../../resources/images/GenericSoft_Logo_White.svg';

import DropDown from '../DropDown/DropDown';
import UserImage from '../UserImage/UserImage';
import { useSelector } from 'react-redux';

import { RootStateType } from '../../redux/reducers/rootReducer';

function NavigationBar() {
  const currentUser = useSelector((state: RootStateType) => state.user);

  let nameLogo = '';

  if (currentUser.firstName && currentUser.lastName) {
    nameLogo =
      currentUser.firstName.substring(0, 1).toUpperCase() +
      currentUser.lastName.substring(0, 1).toUpperCase();
  }

  return (
    <Navbar className="nav">
      <Container>
        <Navbar.Brand className="justify-content-center nav__logo-container">
          <img
            src={logo}
            width="90"
            height="90"
            className="d-inline-block align-top nav__logo-image"
            alt="Generik logo"
          />
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end nav__user-data">
          <Navbar.Text className="nav__user-data--name">
            {currentUser.firstName}
          </Navbar.Text>
          <DropDown
            firstName={currentUser.firstName || ''}
            image={currentUser.profilePic || ''}
            email={currentUser.email}
            nameLogo={nameLogo}
          />
          <UserImage
            userImage={currentUser.profilePic || ''}
            nameLogo={nameLogo}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavigationBar;
