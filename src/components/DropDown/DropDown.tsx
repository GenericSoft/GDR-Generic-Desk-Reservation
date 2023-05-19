import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faUser,
  faGear,
  faBell,
  faEnvelopeOpen,
  faUserGroup,
  faImage,
  faComments,
  faRightFromBracket,
  faFolder,
  faPeopleGroup,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';

import './DropDown.scss';
import { Container } from 'react-bootstrap';
import UserImage from '../UserImage/UserImage';

type User = {
  firstName: string;
  email: string;
  image: string;
  nameLogo: string;
};

function DropDown(user: User) {
  return (
    <NavDropdown className="drop-down" title="">
      <NavDropdown.Item className="drop-down__profile-item">
        <UserImage userImage={user.image} nameLogo={user.nameLogo} />
        <Container className="drop-down__user-content">
          <Container>{user.firstName}</Container>
          <Container className="drop-down__user-content--email">
            {user.email}
          </Container>
        </Container>
      </NavDropdown.Item>
      <Dropdown.Divider />
      <NavDropdown.Item href="#">
        <FontAwesomeIcon icon={faUser} className="drop-down__icon" /> Profile
      </NavDropdown.Item>
      <NavDropdown.Item href="#">
        <FontAwesomeIcon icon={faGear} className="drop-down__icon" /> Acount
      </NavDropdown.Item>
      <NavDropdown.Item href="#">
        <FontAwesomeIcon icon={faChartLine} className="drop-down__icon" />
        Timeline
      </NavDropdown.Item>
      <NavDropdown.Item href="#">
        <FontAwesomeIcon icon={faBell} className="drop-down__icon" />{' '}
        Notifications
      </NavDropdown.Item>
      <NavDropdown.Item href="#">
        {' '}
        <FontAwesomeIcon icon={faEnvelopeOpen} className="drop-down__icon" />
        Messages
      </NavDropdown.Item>
      <NavDropdown.Item href="#">
        <FontAwesomeIcon icon={faUserGroup} className="drop-down__icon" />
        Connections
      </NavDropdown.Item>
      <NavDropdown.Item href="#">
        <FontAwesomeIcon icon={faPeopleGroup} className="drop-down__icon" />
        Groups
      </NavDropdown.Item>
      <NavDropdown.Item href="#">
        <FontAwesomeIcon icon={faImage} className="drop-down__icon" />
        Photos
      </NavDropdown.Item>
      <NavDropdown.Item href="#">
        <FontAwesomeIcon icon={faComments} className="drop-down__icon" />
        Forums
      </NavDropdown.Item>
      <NavDropdown.Item href="#">
        <FontAwesomeIcon icon={faFolder} className="drop-down__icon" />
        Documents
      </NavDropdown.Item>
      <NavDropdown.Item href="#">
        <FontAwesomeIcon
          icon={faRightFromBracket}
          className="drop-down__icon"
        />
        Log Out
      </NavDropdown.Item>
    </NavDropdown>
  );
}
export default DropDown;
