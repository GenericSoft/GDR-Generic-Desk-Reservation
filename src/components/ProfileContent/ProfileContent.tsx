import { useRef, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAppDispatch } from '../../redux/store';
import { editUser } from '../../redux/reducers/userReducer';

import InputField from '../InputField/InputField';
import './ProfileContent.scss';

type UserPropsType = {
  firstName: string;
  lastName: string;
  jobRole?: string;
  email: string;
  userId: string;
  readOnlyValue: boolean;
  cancelEditClick: () => void;
};

const ProfileContent = (userProps: UserPropsType) => {
  const dispatch = useAppDispatch();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const isProfileInEditMode = !userProps.readOnlyValue;

  const firstNameRef = useRef<HTMLInputElement>(null);
  const countyRef = useRef<HTMLInputElement>(null);
  const occupationRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const birthdayRef = useRef<HTMLInputElement>(null);

  const currentRefs =
    firstNameRef.current &&
    lastNameRef.current &&
    occupationRef.current &&
    countyRef.current &&
    birthdayRef.current;

  const cancelEditProfile = () => {
    errorMsg && setErrorMsg('');
    if (currentRefs) {
      firstNameRef.current.value = '';
      occupationRef.current.value = '';
      countyRef.current.value = '';
      lastNameRef.current.value = '';
      birthdayRef.current.value = '';
    }
    userProps.cancelEditClick();
  };

  const updateProfileFieldsDb = () => {
    const userData = {
      userId: userProps.userId,
      newFields: { firstName: '', lastName: '', jobRole: '' },
    };

    if (currentRefs) {
      const firstName = firstNameRef.current.value;
      const lastName = lastNameRef.current.value;
      const occupation = occupationRef.current.value;
      const country = countyRef.current.value;
      const birthday = birthdayRef.current.value;

      if (firstName.length < 4) {
        setErrorMsg(
          'This name is to short. Please choose a name with at least 4 letters'
        );
        return;
      }
      if (lastName.length < 2) {
        setErrorMsg(
          'This last name is to short. Please enter another last name'
        );
        return;
      }
      if (occupation.length === 0) {
        setErrorMsg('Pleas enter your job role');
        return;
      }
      if (country.length === 0) {
        setErrorMsg('Pleas enter country');
        return;
      }
      if (birthday.length === 0) {
        setErrorMsg('Pleas enter you birthday data');
        return;
      }
      userData.newFields.firstName = firstName || userProps.firstName;
      userData.newFields.lastName = lastName || userProps.lastName;
      userData.newFields.jobRole = occupation || userProps.jobRole || '';
      countyRef.current.value = '';
      occupationRef.current.value = '';
      firstNameRef.current.value = '';
      lastNameRef.current.value = '';
      birthdayRef.current.value = '';
    }

    dispatch(editUser(userData));
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
                placeholder={userProps.firstName}
                readOnlyValue={userProps.readOnlyValue}
              />
            </Col>
          </Row>
          <Row>
            <Col>Country</Col>
            <Col>
              {' '}
              <InputField
                className="profile-form"
                reference={countyRef}
                placeholder=""
                readOnlyValue={userProps.readOnlyValue}
              />
            </Col>
          </Row>
          <Row>
            <Col>Occupation</Col>
            <Col>
              {' '}
              <InputField
                className={`profile-form ${
                  !userProps.jobRole && 'profile-form--job-role'
                }`}
                reference={occupationRef}
                placeholder={userProps.jobRole || 'please add your job role'}
                readOnlyValue={userProps.readOnlyValue}
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
                placeholder={userProps.lastName}
                readOnlyValue={userProps.readOnlyValue}
              />
            </Col>
          </Row>
          <Row>
            <Col>Birthday</Col>
            <Col>
              {' '}
              <InputField
                className="profile-form"
                reference={birthdayRef}
                placeholder=""
                readOnlyValue={userProps.readOnlyValue}
              />
            </Col>
          </Row>
          <Row>
            <Col>Email</Col>
            <Col className="first-row__email-column">{userProps.email}</Col>
          </Row>
        </Col>
        {isProfileInEditMode && (
          <Row className="first-row__buttons">
            {errorMsg && (
              <div className="first-row__buttons--error error-message">
                {errorMsg}
              </div>
            )}

            <button
              className="first-row__buttons--cancel"
              onClick={cancelEditProfile}
            >
              cancel
            </button>
            <button
              className="first-row__buttons--save"
              onClick={updateProfileFieldsDb}
            >
              save
            </button>
          </Row>
        )}
      </Row>
      <Row className="second-row">
        <Col sm className="second-row__col">
          <Col sm={4} className="second-row__col--flex-number primary-color">
            35
          </Col>
          <Col sm={8} className="second-row__col--container-data">
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
          <Col sm={8} className="second-row__col--container-data">
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
