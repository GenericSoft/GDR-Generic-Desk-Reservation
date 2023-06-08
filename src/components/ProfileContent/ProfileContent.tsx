import { useRef, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAppDispatch } from '../../redux/store';
import { editUser } from '../../redux/reducers/userReducer';

import InputField from '../InputField/InputField';
import './ProfileContent.scss';
import { validateEditProfile } from '../../utils/validations';

import { useAppSelector } from '../../redux/store';

type PropsType = {
  isProfileInEditMode: boolean;
  cancelEditClick: () => void;
};

const ProfileContent = (props: PropsType) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [errorMsg, setErrorMsg] = useState<string>('');

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
      firstNameRef.current.value = user.firstName || '';
      occupationRef.current.value = user.jobRole || '';
      countyRef.current.value = '';
      lastNameRef.current.value = user.lastName || '';
      birthdayRef.current.value = '';
    }
    props.cancelEditClick();
  };

  const updateProfileFieldsDb = () => {
    const userData = {
      userId: user.userId,
      newFields: { firstName: '', lastName: '', jobRole: '' },
    };

    if (currentRefs) {
      const firstNameInputValue = firstNameRef.current.value;
      const lastNameInputValue = lastNameRef.current.value;
      const occupationInputValue = occupationRef.current.value;
      const countryInputValue = countyRef.current.value;
      const birthdayInputValue = birthdayRef.current.value;

      const errMessage = validateEditProfile({
        firstName: firstNameInputValue,
        lastName: lastNameInputValue,
        occupation: occupationInputValue,
        country: countryInputValue,
        birthday: birthdayInputValue,
      });
      setErrorMsg(errMessage);

      userData.newFields.firstName = firstNameInputValue;
      userData.newFields.lastName = lastNameInputValue;
      userData.newFields.jobRole = occupationInputValue;
      if (errMessage) {
        return;
      }
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
                placeholder={user.firstName || ''}
                readOnlyValue={props.isProfileInEditMode}
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
                readOnlyValue={props.isProfileInEditMode}
              />
            </Col>
          </Row>
          <Row>
            <Col>Occupation</Col>
            <Col>
              {' '}
              <InputField
                className={`profile-form ${
                  !user.jobRole && 'profile-form--job-role'
                }`}
                reference={occupationRef}
                placeholder={user.jobRole || 'please add your job role'}
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
                placeholder={user.lastName || ''}
                readOnlyValue={props.isProfileInEditMode}
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
