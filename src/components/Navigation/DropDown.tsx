import NavDropdown from 'react-bootstrap/NavDropdown';

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

function DropDown() {
  return (
    <NavDropdown className="drop-down" title="">
      <NavDropdown.Item href="#">
        <FontAwesomeIcon icon={faUser} /> Profile
      </NavDropdown.Item>
      <NavDropdown.Item href="#">
        <FontAwesomeIcon icon={faGear} /> Acount
      </NavDropdown.Item>
      <NavDropdown.Item href="#">
        <FontAwesomeIcon icon={faChartLine} />
        Timeline
      </NavDropdown.Item>
      <NavDropdown.Item href="#">
        <FontAwesomeIcon icon={faBell} /> Notifications
      </NavDropdown.Item>
      <NavDropdown.Item href="#">
        {' '}
        <FontAwesomeIcon icon={faEnvelopeOpen} />
        Messages
      </NavDropdown.Item>
      <NavDropdown.Item href="#">
        <FontAwesomeIcon icon={faUserGroup} />
        Connections
      </NavDropdown.Item>
      <NavDropdown.Item href="#">
        <FontAwesomeIcon icon={faPeopleGroup} />
        Groups
      </NavDropdown.Item>
      <NavDropdown.Item href="#">
        <FontAwesomeIcon icon={faImage} />
        Photos
      </NavDropdown.Item>
      <NavDropdown.Item href="#">
        <FontAwesomeIcon icon={faComments} />
        Forums
      </NavDropdown.Item>
      <NavDropdown.Item href="#">
        <FontAwesomeIcon icon={faFolder} />
        Documents
      </NavDropdown.Item>
      <NavDropdown.Item href="#">
        <FontAwesomeIcon icon={faRightFromBracket} />
        Log Out
      </NavDropdown.Item>
    </NavDropdown>
  );
}
export default DropDown;
