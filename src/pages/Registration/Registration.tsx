import React, { useRef } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useAppDispatch } from '../../redux/store';
import { registerUser } from '../../redux/reducers/userReducer';

import './Registration.scss';
import FormContainer from '../../components/FormContainer/FormContainer';

const Registration = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const dispatch: any = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      firstNameRef.current === null ||
      lastNameRef.current === null ||
      emailRef.current === null ||
      passwordRef.current === null
    ) {
      return;
    }

    const firstName = lastNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const formValues = {
      firstName,
      lastName,
      email,
      password,
    };

    if (firstName && lastName && email && password) {
      const response = dispatch(registerUser(formValues));
    }

    console.log(
      'firstNameRef',
      firstNameRef.current !== null && firstNameRef.current.value
    );
    console.log(
      'lastNameRef',
      lastNameRef.current !== null && lastNameRef.current.value
    );
    console.log(
      'emailRef',
      emailRef.current !== null && emailRef.current.value
    );
    console.log(
      'passwordRef',
      passwordRef.current !== null && passwordRef.current.value
    );
  };

  return (
    <FormContainer
      onClick={() => console.log('function to navigate to log in page')}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 one-line" controlId="formBasicEmail">
          <Form.Label className="form-label">First name</Form.Label>
          <Form.Control ref={firstNameRef} placeholder="Enter first name" />
        </Form.Group>
        <Form.Group className="mb-3 one-line" controlId="formBasicEmail">
          <Form.Label className="form-label">Last name</Form.Label>
          <Form.Control ref={lastNameRef} placeholder="Enter last name" />
        </Form.Group>
        <Form.Group className="mb-3 one-line" controlId="formBasicEmail">
          <Form.Label className="form-label">Email address</Form.Label>
          <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3 one-line" controlId="formBasicEmail">
          <Form.Label className="form-label">Password</Form.Label>
          <Form.Control
            ref={passwordRef}
            type="password"
            placeholder="Enter password"
          />
        </Form.Group>
        <Button className="form-submit-btn" type="submit">
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Registration;
