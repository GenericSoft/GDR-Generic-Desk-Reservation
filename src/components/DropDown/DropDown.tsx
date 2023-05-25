import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import { Container } from 'react-bootstrap';

import { logoutUser } from '../../redux/reducers/userReducer';
import { useAppDispatch } from '../../redux/store';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faRightFromBracket,
  faFolder,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';

import './DropDown.scss';
import UserImage from '../UserImage/UserImage';

type User = {
  firstName: string;
  email: string;
  image: string;
  nameLogo: string;
};

const DropDown = (user: User) => {
  const dispatch = useAppDispatch();
  const logoutFunc = async () => {
    await dispatch(logoutUser());
  };
  return (
    <NavDropdown id="nav-dropdown" className="drop-down" title="" align="end">
      <NavDropdown.Item className="drop-down__profile-item">
        <UserImage userImage={user.image} nameLogo={user.nameLogo} />
        <Container className="drop-down__user-content">
          <Container className="drop-down__user-content--name">
            <p>{user.firstName}</p>
          </Container>
          <Container className="drop-down__user-content--email">
            <p>{user.email}</p>
          </Container>
        </Container>
      </NavDropdown.Item>
      <Dropdown.Divider />
      <NavDropdown.Item href="#">
        <FontAwesomeIcon icon={faUser} className="drop-down__icon" /> Profile
      </NavDropdown.Item>

      <NavDropdown.Item href="#">
        <FontAwesomeIcon icon={faChartLine} className="drop-down__icon" />
        Dashboard
      </NavDropdown.Item>
      <NavDropdown.Item href="#">
        <FontAwesomeIcon icon={faFolder} className="drop-down__icon" />
        Documents
      </NavDropdown.Item>
      <NavDropdown.Item href="#" onClick={logoutFunc}>
        <FontAwesomeIcon
          icon={faRightFromBracket}
          className="drop-down__icon"
        />
        Log Out
      </NavDropdown.Item>
    </NavDropdown>
  );
};
export default DropDown;
