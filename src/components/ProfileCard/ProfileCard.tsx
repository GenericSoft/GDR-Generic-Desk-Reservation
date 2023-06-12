import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faPenToSquare,
  faUser,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';

import './ProfileCard.scss';
import UserImage from '../UserImage/UserImage';

import { useAppSelector } from '../../redux/store';

type ProfileCardProps = {
  activeEditClick: (prop: boolean) => void;
};

const ProfileCard = (props: ProfileCardProps) => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const editClick = () => {
    props.activeEditClick(false);
  };

  return (
    <Card className="profile-card-container">
      <Container className="user-data-container">
        <UserImage
          firstName={user.firstName || ''}
          lastName={user.lastName || ''}
          userImage={user.profilePic || ''}
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
        <ListGroup.Item>
          <Card.Link
            onClick={() => {
              navigate('/dashboard');
            }}
          >
            <FontAwesomeIcon icon={faChartLine} className="drop-down__icon" />
            Dashboard
          </Card.Link>
        </ListGroup.Item>
        <ListGroup.Item className="list-group-flush__flex-item">
          <Card.Link href="#">
            <FontAwesomeIcon icon={faCalendarDays} /> Recent Activity{' '}
          </Card.Link>
          <span>9</span>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Link href="#" onClick={editClick}>
            <FontAwesomeIcon icon={faPenToSquare} />
            Edit profile
          </Card.Link>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};
export default ProfileCard;
