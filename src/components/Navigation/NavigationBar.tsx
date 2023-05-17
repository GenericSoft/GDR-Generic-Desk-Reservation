import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import './NavigationBar.scss';
import logo from '../../utils/images/GenericSoft_Logo_White (1).svg';
import userImage from '../../utils/images/download.jpg';

import DropDown from './DropDown';

const user = {
  firstName: 'Lia',
  lastName: 'blq blq',
  email: 'liaB@abv.bg',
  image: userImage,
};

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
          <DropDown />
          <img
            src={user.image}
            className="nav__user-data--image"
            alt="user img"
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavigationBar;
