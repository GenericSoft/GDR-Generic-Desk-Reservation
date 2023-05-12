import React, { useRef, useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import FormContainer from '../../components/FormContainer/FormContainer';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { registerUser } from '../../redux/reducers/userReducer';

import './Registration.scss';
import { createUserRequest } from '../../api/reservationDeskBackend/userApi';

const Registration = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const userId = useAppSelector((state) => state.user.userId);

  const [errorMsg, setErrorMsg] = useState<string>('');

  const dispatch: any = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      firstNameRef.current === null ||
      lastNameRef.current === null ||
      emailRef.current === null ||
      passwordRef.current === null
    ) {
      return;
    }

    const firstName = firstNameRef.current.value;
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
      try {
        errorMsg && setErrorMsg('');

        await dispatch(registerUser(formValues));

        createUserRequest({
          userId,
          firstName,
          lastName,
          email,
        });

        //clear the input after successful submit
        firstNameRef.current.value = '';
        lastNameRef.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = '';
      } catch (error: any) {
        if (error.message === 'auth/email-already-in-use') {
          setErrorMsg('This email is already in use!');
        }

        if (error.message === 'auth/invalid-email') {
          setErrorMsg('The email is invalid!');
        }

        if (error.message === 'auth/weak-password') {
          setErrorMsg('Password must be at least 6 characters!');
        }
      }
    } else {
      setErrorMsg('Please fill all the fields!');
    }
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

        {errorMsg && <div className="error-message">{errorMsg}</div>}

        <Button className="btn-primary" type="submit">
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Registration;
