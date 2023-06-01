import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useRef } from 'react';

type userDataType = {
  firstName: string;
  lastName: string;
  email: string;
  readOnlyValue: boolean;
};

import './ProfileContent.scss';
import InputField from '../InputField/InputField';
const ProfileContent = (userData: userDataType) => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const countyRef = useRef<HTMLInputElement>(null);
  const occupationRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const birthdayRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const getAllNewValues = () => {
    //test if the values are getting
    if (firstNameRef.current && countyRef.current) {
      console.log(firstNameRef.current.value);
      console.log(countyRef.current.value);
      firstNameRef.current.value = '';
      countyRef.current.value = '';
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
                placeholder={userData.firstName}
                readOnlyValue={userData.readOnlyValue}
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
                placeholder="Sofiya"
                readOnlyValue={userData.readOnlyValue}
              />
            </Col>
          </Row>
          <Row>
            <Col>Occupation</Col>
            <Col>
              {' '}
              <InputField
                className="profile-form"
                reference={occupationRef}
                placeholder="Developer"
                readOnlyValue={userData.readOnlyValue}
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
                placeholder={userData.lastName}
                readOnlyValue={userData.readOnlyValue}
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
                placeholder="9 Semptember 1998"
                readOnlyValue={userData.readOnlyValue}
              />
            </Col>
          </Row>
          <Row>
            <Col>Email</Col>
            <Col className="first-row__email-column">
              {' '}
              <InputField
                className="profile-form"
                reference={emailRef}
                placeholder={userData.email}
                readOnlyValue={userData.readOnlyValue}
              />
            </Col>
          </Row>
        </Col>
        <button onClick={getAllNewValues}>edit Profile</button>
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
