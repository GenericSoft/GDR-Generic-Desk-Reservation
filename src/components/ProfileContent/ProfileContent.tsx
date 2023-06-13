import { useRef, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { useAppDispatch } from '../../redux/store';
import { editUser } from '../../redux/reducers/userReducer';

import InputField from '../InputField/InputField';
import './ProfileContent.scss';
import { validateEditProfile } from '../../utils/validations';

import { useAppSelector } from '../../redux/store';
import { EditUserDataType } from '../../interfaces/User';

type ProfileContentProps = {
  isProfileInEditMode: boolean;
  cancelEditClick: (prop: boolean) => void;
};

const ProfileContent = (props: ProfileContentProps) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [errorMsg, setErrorMsg] = useState<string>('');

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
      countryRef.current.value = '';
      lastNameRef.current.value = user.lastName || '';
      birthdayRef.current.value = '';
    }
    props.cancelEditClick(true);
  };

  const updateProfileFieldsDb = () => {
    const userData: EditUserDataType = {
      userId: user.userId,
      newFields: { firstName: '', lastName: '' },
    };

    if (currentRefs) {
      const firstNameInputValue = firstNameRef.current.value.trim();
      const lastNameInputValue = lastNameRef.current.value.trim();
      const jobRoleInputValue = jobRoleRef.current.value.trim();

      const errMessage = validateEditProfile({
        firstName: firstNameInputValue,
        lastName: lastNameInputValue,
      });
      setErrorMsg(errMessage);

      userData.newFields.firstName = firstNameInputValue;
      userData.newFields.lastName = lastNameInputValue;

      if (jobRoleInputValue || user.jobRole) {
        userData.newFields.jobRole = jobRoleInputValue;
      }

      if (errMessage) {
        return;
      }
      firstNameRef.current.value = firstNameRef.current.value.trim();
      lastNameRef.current.value = lastNameRef.current.value.trim();
      birthdayRef.current.value = '';
      countryRef.current.value = '';
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
                className="profile-form profile-form--empty"
                reference={countryRef}
                placeholder="your country"
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
                placeholder={user.jobRole || 'your job role'}
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
                placeholder={user.lastName || ''}
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
                className="profile-form profile-form--empty"
                reference={birthdayRef}
                placeholder="your birthday"
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
