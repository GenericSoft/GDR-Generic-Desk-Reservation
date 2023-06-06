import { useRef } from 'react';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAppDispatch } from '../../redux/store';

import { editUser } from '../../redux/reducers/userReducer';

type UserPropsType = {
  firstName: string;
  lastName: string;
  jobRole?: string;
  email: string;
  userId: string;
  readOnlyValue: boolean;
};

import './ProfileContent.scss';
import InputField from '../InputField/InputField';

const ProfileContent = (userProps: UserPropsType) => {
  const dispatch = useAppDispatch();

  const firstNameRef = useRef<HTMLInputElement>(null);
  // const countyRef = useRef<HTMLInputElement>(null);
  const occupationRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  // const birthdayRef = useRef<HTMLInputElement>(null);

  if (
    userProps.readOnlyValue &&
    firstNameRef.current &&
    lastNameRef.current &&
    occupationRef.current
  ) {
    firstNameRef.current.value = '';
    occupationRef.current.value = '';
    // countyRef.current!.value = '';
    // occupationRef.current!.value = '';
    lastNameRef.current.value = '';
    // birthdayRef.current!.value = '';
  }

  const getAllNewValues = () => {
    // let newValues = {};
    const userData = {
      userId: userProps.userId,
      newFields: { firstName: '', lastName: '', jobRole: '' },
    };

    if (
      firstNameRef.current &&
      // countyRef.current &&
      occupationRef.current &&
      lastNameRef.current
      // birthdayRef.current
    ) {
      // newValues = {
      //   firstName: firstNameRef.current.value,
      //   // countyRef: countyRef.current.value,
      //   jobRole: occupationRef.current.value,
      //   lastName: lastNameRef.current.value,
      //   // birthdayRef: birthdayRef.current.value,
      // };
      userData.newFields.firstName =
        firstNameRef.current.value || userProps.firstName;
      userData.newFields.lastName =
        lastNameRef.current.value || userProps.lastName;
      userData.newFields.jobRole =
        occupationRef.current.value || userProps.jobRole || '';
      // countyRef.current!.value = ''
      occupationRef.current.value = '';
      firstNameRef.current.value = '';
      lastNameRef.current.value = '';
      // birthdayRef.current!.value = '';
    }

    // const userData = { userId: userProps.userId, newFields: newValues };
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
          {/* <Row>
            <Col>Country</Col>
            <Col>
              {' '}
              <InputField
                className="profile-form"
                reference={countyRef}
                placeholder="Sofiya"
                readOnlyValue={userProps.readOnlyValue}
              />
            </Col>
          </Row> */}
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
          {/* <Row>
            <Col>Birthday</Col>
            <Col>
              {' '}
              <InputField
                className="profile-form"
                reference={birthdayRef}
                placeholder="9 Semptember 1998"
                readOnlyValue={userProps.readOnlyValue}
              />
            </Col>
          </Row> */}
          <Row>
            <Col>Email</Col>
            <Col className="first-row__email-column">{userProps.email}</Col>
          </Row>
        </Col>
        <button onClick={getAllNewValues}>save</button>
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
