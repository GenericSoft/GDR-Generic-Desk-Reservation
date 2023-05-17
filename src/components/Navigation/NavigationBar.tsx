import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import './NavigationBar.scss';
import logo from '../../resources/images/GenericSoft_Logo_White.svg';
import userImage from '../../resources/images/pexels-pixabay-415829.jpg';

import DropDown from './DropDown';
import UserImage from './UserImage';

const user = {
  firstName: 'Lia',
  lastName: 'blq blq',
  email: 'liaB@abv.bg',
  image: userImage,
};

const nameLogo = user.firstName.substring(0, 1) + user.lastName.substring(0, 1);

function NavigationBar() {
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
            {user.firstName}
          </Navbar.Text>
          <DropDown
            firstName={user.firstName}
            image={user.image}
            email={user.email}
            nameLogo={nameLogo}
          />
          <UserImage userImage={user.image} nameLogo={nameLogo} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavigationBar;
