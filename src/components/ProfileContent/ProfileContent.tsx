import { useRef, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Spinner } from 'react-bootstrap';

import InputField from '../InputField/InputField';
import './ProfileContent.scss';
import { validateEdit, validateEditProfile } from '../../utils/validations';

import { editUser } from '../../redux/reducers/userReducer';
import { useAppDispatch } from '../../redux/store';
import { useAppSelector } from '../../redux/store';
import { EditUserDataType } from '../../interfaces/User';
import { toError } from '../../utils/error';

type ProfileContentProps = {
  isProfileInEditMode: boolean;
  cancelEditClick: (prop: boolean) => void;
  setChooseImage: (prop: File) => void;
  setLoading: (prop: string) => void;
  chooseImage: File;
};
let initialImageState: File;

const ProfileContent = (props: ProfileContentProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loadingRequest, setLoadingRequest] = useState(false);
  async function dispatchEditUserRequest(userData: EditUserDataType) {
    try {
      setLoadingRequest(true);
      await dispatch(editUser(userData)).then(() => {
        setLoadingRequest(false);
      });
      props.cancelEditClick(true);
    } catch (error) {
      const err = toError(error);
      const errMessage = validateEdit(err);
      setErrorMsg(errMessage);
      setLoadingRequest(false);
    }
  }

  const firstNameRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const jobRoleRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const birthdayRef = useRef<HTMLInputElement>(null);

  const currentRefs =
    firstNameRef.current &&
    lastNameRef.current &&
    jobRoleRef.current &&
    countryRef.current &&
    birthdayRef.current;

  const cancelEditProfile = () => {
    errorMsg && setErrorMsg('');

    if (currentRefs) {
      firstNameRef.current.value = user.firstName || '';
      jobRoleRef.current.value = user.jobRole || '';
      countryRef.current.value = user.country || '';
      lastNameRef.current.value = user.lastName || '';
      birthdayRef.current.value = user.birthday || '';
    }
    props.cancelEditClick(true);
  };

  const updateProfileFieldsDb = async () => {
    const userData: EditUserDataType = {
      userId: user.userId,
      newFields: { firstName: '', lastName: '' },
    };

    if (currentRefs) {
      const firstNameInputValue = firstNameRef.current.value.trim();
      const lastNameInputValue = lastNameRef.current.value.trim();
      const jobRoleInputValue = jobRoleRef.current.value.trim();
      const countryInputValue = countryRef.current.value.trim();
      const birthdayInputValue = birthdayRef.current.value.trim();

      const errMessage = validateEditProfile({
        firstName: firstNameInputValue,
        lastName: lastNameInputValue,
      });
      setErrorMsg(errMessage);
      userData.newFields.firstName = firstNameInputValue;
      userData.newFields.lastName = lastNameInputValue;

      props.setChooseImage(initialImageState);

      if (jobRoleInputValue || user.jobRole) {
        userData.newFields.jobRole = jobRoleInputValue;
      }
      if (countryInputValue || user.country) {
        userData.newFields.country = countryInputValue;
      }
      if (birthdayInputValue || user.birthday) {
        userData.newFields.birthday = birthdayInputValue;
      }

      if (errMessage) {
        return;
      }
      if (props.chooseImage) {
        const storageRef = ref(storage, user.userId);
        const uploadImage = uploadBytesResumable(storageRef, props.chooseImage);
        props.setLoading('uploading is...');
        uploadImage.on(
          'state_changed',
          async (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (progress === 100) {
              props.setLoading('uploading is ' + progress + '% done');
            }
          },
          (error) => {
            throw toError(error, true);
          },
          async () => {
            const imgUrl = await getDownloadURL(uploadImage.snapshot.ref);
            userData.newFields.profilePic = imgUrl;
            dispatchEditUserRequest(userData);
          }
        );
      } else {
        dispatchEditUserRequest(userData);
      }

      firstNameRef.current.value = firstNameRef.current.value.trim();
      lastNameRef.current.value = lastNameRef.current.value.trim();
      birthdayRef.current.value = birthdayRef.current.value.trim();
      countryRef.current.value = countryRef.current.value.trim();
    }
  };

  return (
    <Container className="profile-content-container">
      <Row className="first-row">
        <Card className="card-content card-box">
          <Card.Body className="card-content__body card-box__body">
            <Card.Text className="card-content__text">
              Some advice text.Some advice text.Some advice text.Some advice
              text.Some advice text.Some advice text.Some advice text.Some
              advice text.
            </Card.Text>
            <Card.Title className="card-content__title">Profile</Card.Title>
          </Card.Body>
        </Card>
        <Col sm>
          <Row>
            <Col>First Name</Col>
            <Col>
              <InputField
                className="profile-form"
                reference={firstNameRef}
                placeholder=""
                defaultValue={user.firstName || ''}
                readOnlyValue={props.isProfileInEditMode}
              />
            </Col>
          </Row>
          <Row>
            <Col>Country</Col>
            <Col>
              {' '}
              <InputField
                className={`profile-form ${
                  !user.country && 'profile-form--empty'
                }`}
                reference={countryRef}
                placeholder={!props.isProfileInEditMode ? '' : 'your country'}
                defaultValue={user.country || ''}
                readOnlyValue={props.isProfileInEditMode}
              />
            </Col>
          </Row>
          <Row>
            <Col>Job Role</Col>
            <Col>
              {' '}
              <InputField
                className={`profile-form ${
                  !user.jobRole && 'profile-form--empty'
                }`}
                reference={jobRoleRef}
                placeholder={!props.isProfileInEditMode ? '' : 'your job'}
                defaultValue={user.jobRole || ''}
                readOnlyValue={props.isProfileInEditMode}
              />
            </Col>
          </Row>
        </Col>
        <Col sm>
          <Row>
            <Col>Last Name</Col>
            <Col>
              {' '}
              <InputField
                className="profile-form"
                reference={lastNameRef}
                placeholder=""
                defaultValue={user.lastName || ''}
                readOnlyValue={props.isProfileInEditMode}
              />
            </Col>
          </Row>
          <Row>
            <Col>Birthday</Col>
            <Col>
              {' '}
              <InputField
                className={`profile-form ${
                  !user.birthday && 'profile-form--empty'
                }`}
                reference={birthdayRef}
                placeholder={!props.isProfileInEditMode ? '' : 'your birthday'}
                defaultValue={user.birthday || ''}
                readOnlyValue={props.isProfileInEditMode}
              />
            </Col>
          </Row>
          <Row>
            <Col>Email</Col>
            <Col className="first-row__email-column">{user.email}</Col>
          </Row>
        </Col>

        {!props.isProfileInEditMode && (
          <Row className="first-row__buttons">
            {loadingRequest && (
              <Row>
                <Col colSpan={8} className="first-row__center-spinner">
                  <Spinner animation="grow" className="bg-primary" />
                </Col>
              </Row>
            )}
            {errorMsg && (
              <div className="first-row__buttons--error error-message">
                {errorMsg}
              </div>
            )}

            <Button
              className="btn-secondary mt-2 first-row__buttons--btn btn-cancel"
              onClick={cancelEditProfile}
            >
              Cancel
            </Button>
            <Button
              className="btn-primary mt-2 first-row__buttons--btn"
              onClick={updateProfileFieldsDb}
            >
              Save
            </Button>
          </Row>
        )}
      </Row>
      <Row className="second-row">
        <Col sm className="second-row__col">
          <Col sm={4} className="second-row__col--flex-number primary-color">
            35
          </Col>
          <Col sm={8}>
            <Card.Text className="second-row__col--title primary-color">
              Envato Website
            </Card.Text>
            <Card.Text>15 July</Card.Text>
            <Card.Text>15 August</Card.Text>
          </Col>
        </Col>
        <Col sm className="second-row__col">
          <Col sm={4} className="second-row__col--flex-number success-color">
            35
          </Col>
          <Col sm={8}>
            <Card.Text className="second-row__col--title success-color">
              ThemeForest CMS
            </Card.Text>
            <Card.Text>15 July</Card.Text>
            <Card.Text>15 August</Card.Text>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};
export default ProfileContent;
