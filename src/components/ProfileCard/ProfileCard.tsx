import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { storage } from '../../firebase';
import { ref, deleteObject } from 'firebase/storage';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Container, Row } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faPenToSquare,
  faUser,
  faChartLine,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

import './ProfileCard.scss';
import UserImage from '../UserImage/UserImage';

import { toError } from '../../utils/error';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { editUser } from '../../redux/reducers/userReducer';
import { useEffect } from 'react';

type ProfileCardProps = {
  isProfileInEditMode: boolean;
  activeEditClick: (prop: boolean) => void;
  setChosenImage: (prop: File | undefined) => void;
  setLoading: (prop: string) => void;
  loading: string;
};

const ProfileCard = ({
  isProfileInEditMode,
  activeEditClick,
  setChosenImage,
  setLoading,
  loading,
}: ProfileCardProps) => {
  const [instantPhoto, setInstantPhoto] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const chooseImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const reader = new FileReader();
      setChosenImage(e.target.files[0]);

      reader.onload = (e) => {
        if (e.target) {
          setInstantPhoto(e.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const deleteImage = () => {
    if (user.profilePic) {
      const text = 'Are you sure to delete your photo ?';
      if (confirm(text) === true) {
        setLoading('');
        const storageRef = ref(storage, user.userId);
        try {
          deleteObject(storageRef).then(() => {
            const data = {
              userId: user.userId,
              newFields: {
                profilePic: '',
              },
            };
            dispatch(editUser(data));
          });
          setChosenImage(undefined);
          setLoading('');
        } catch (err) {
          throw toError(err, true);
        }
      }
    }
  };

  const editClick = () => {
    setLoading('');
    activeEditClick(true);
  };
  useEffect(() => {
    setInstantPhoto('');
  }, [isProfileInEditMode]);

  return (
    <Card className="profile-card-container">
      <Container className="user-data-container">
        <UserImage
          firstName={user.firstName || ''}
          lastName={user.lastName || ''}
          userImage={instantPhoto || user.profilePic || ''}
        />
        <Card.Title className="user-data-container__title">{`${user.firstName} ${user.lastName}`}</Card.Title>
        <Card.Text className="user-data-container__email">
          {user.email}
        </Card.Text>
        {isProfileInEditMode && (
          <Row className="user-data-container__buttons">
            <span className="user-data-container__buttons--text">
              {loading}
            </span>
            <Container>
              <label
                htmlFor="file-upload"
                className="user-data-container__buttons--add-btn btn-secondary"
              >
                <input
                  id="file-upload"
                  className="user-data-container__buttons--add-btn"
                  type="file"
                  onChange={chooseImageHandler}
                  accept=".jpg, .jpeg, .png"
                />{' '}
                Add photo
              </label>
              <FontAwesomeIcon
                onClick={deleteImage}
                className="user-data-container__buttons--delete-icon"
                icon={faCircleXmark}
              />{' '}
            </Container>
          </Row>
        )}
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
            href="#"
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
