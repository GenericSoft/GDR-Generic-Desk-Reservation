import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faPenToSquare,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

type UserDataType = {
  userImage: string;
  firstName: string;
  lastName: string;
  email: string;
  onClick: () => void;
};

import './ProfileCard.scss';
import UserImage from '../UserImage/UserImage';
import { Container } from 'react-bootstrap';
const ProfileCard = (user: UserDataType) => {
  return (
    <Card style={{ width: '18rem' }} className="profile-card-container">
      <Container className="user-data-container">
        <UserImage
          firstName={user.firstName}
          lastName={user.lastName}
          userImage={user.userImage}
        />
        <Card.Title className="user-data-container__title">{`${user.firstName} ${user.lastName}`}</Card.Title>
        <Card.Text className="user-data-container__email">
          {user.email}
        </Card.Text>
      </Container>

      <Card.Body className="profile-card-body"></Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <Card.Link href="#">
            <FontAwesomeIcon icon={faUser} className="drop-down__icon" />
            Profile
          </Card.Link>
        </ListGroup.Item>
        <ListGroup.Item className="list-group-flush__flex-item">
          <Card.Link href="#">
            <FontAwesomeIcon icon={faCalendarDays} /> Recent Activity{' '}
          </Card.Link>
          <span>9</span>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Link href="#" onClick={user.onClick}>
            <FontAwesomeIcon icon={faPenToSquare} />
            Edit profile
          </Card.Link>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};
export default ProfileCard;
