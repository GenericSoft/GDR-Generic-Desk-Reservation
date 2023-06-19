import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { storage } from '../../firebase';
import { deleteObject } from 'firebase/storage';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

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

type ProfileCardProps = {
  activeEditClick: (prop: boolean) => void;
};

const ProfileCard = (props: ProfileCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [chooseImage, setChooseImage] = useState<File>();
  const [activeChooseImage, setActiveChooseImage] = useState(false);
  const [loading, setLoading] = useState('');
  const clickImage = () => {
    setActiveChooseImage((state) => !state);
    setLoading('');
  };
  const editClick = () => {
    props.activeEditClick(false);
  };

  const chooseImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      setChooseImage(e.target.files[0]);
    }
  };

  const uploadImage = () => {
    if (chooseImage) {
      // const name = chooseImage.name;
      const storageRef = ref(storage, user.userId);
      const uploadImage = uploadBytesResumable(storageRef, chooseImage);
      setLoading('uploading is...');
      uploadImage.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress === 100) {
            setLoading('uploading is' + progress + '% done');
          }
        },
        (error) => {
          throw toError(error, true);
        },
        () => {
          getDownloadURL(uploadImage.snapshot.ref).then((downLoadURl) => {
            const data = {
              userId: user.userId,
              newFields: {
                profilePic: downLoadURl,
              },
            };
            dispatch(editUser(data));
          });
        }
      );
    }
  };
  const deleteImage = () => {
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
    } catch (err) {
      throw toError(err, true);
    }
  };

  return (
    <Card className="profile-card-container">
      <Container className="user-data-container">
        <UserImage
          firstName={user.firstName || ''}
          lastName={user.lastName || ''}
          userImage={user.profilePic || ''}
          onClick={clickImage}
        />
        <Card.Title className="user-data-container__title">{`${user.firstName} ${user.lastName}`}</Card.Title>
        <Card.Text className="user-data-container__email">
          {user.email}
        </Card.Text>
        {activeChooseImage && (
          <Row className="user-data-container__buttons">
            <input
              className="user-data-container__buttons--file-input"
              type="file"
              onChange={chooseImageHandler}
              accept=".jpg, .jpeg, .png"
            />
            <span>{loading}</span>
            <Button
              className="user-data-container__buttons--add-btn btn-secondary"
              onClick={uploadImage}
            >
              Add photo
            </Button>
            <FontAwesomeIcon
              onClick={deleteImage}
              className="user-data-container__buttons--delete-icon"
              icon={faCircleXmark}
            />{' '}
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
