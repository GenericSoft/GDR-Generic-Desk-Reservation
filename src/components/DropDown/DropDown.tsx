import { useNavigate } from 'react-router-dom';

import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import { Container } from 'react-bootstrap';
import {
  faUser,
  faRightFromBracket,
  faFolder,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { logoutUser } from '../../redux/reducers/userReducer';
import { useAppDispatch } from '../../redux/store';

import './DropDown.scss';
import UserImage from '../UserImage/UserImage';

type UserProps = {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

const DropDown = ({ firstName, lastName, email, image }: UserProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logoutFunc = async () => {
    await dispatch(logoutUser());
  };
  return (
    <NavDropdown id="nav-dropdown" className="drop-down" title="" align="end">
      <NavDropdown.Item className="drop-down__profile-item">
        <UserImage
          userImage={image}
          firstName={firstName || ''}
          lastName={lastName || ''}
        />
        <Container className="drop-down__user-content">
          <Container className="drop-down__user-content--name">
            <p>{firstName}</p>
          </Container>
          <Container className="drop-down__user-content--email">
            <p>{email}</p>
          </Container>
        </Container>
      </NavDropdown.Item>
      <Dropdown.Divider />
      <NavDropdown.Item
        onClick={() => {
          navigate('/profile');
        }}
      >
        <FontAwesomeIcon icon={faUser} className="drop-down__icon" /> Profile
      </NavDropdown.Item>

      <NavDropdown.Item
        href="#"
        onClick={() => {
          navigate('/dashboard');
        }}
      >
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
