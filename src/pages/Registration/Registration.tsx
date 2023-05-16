import React, { useRef, useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import FormContainer from '../../components/FormContainer/FormContainer';
import InputField from '../../components/InputField/InputField';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { registerUser } from '../../redux/reducers/userReducer';

import './Registration.scss';
import { createUserRequest } from '../../api/reservationDeskBackend/userApi';
import { toError } from '../../utils/error';

const Registration = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const userId = useAppSelector((state) => state.user.userId);

  const [errorMsg, setErrorMsg] = useState<string>('');

  const dispatch = useAppDispatch();

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
      } catch (error) {
        const err = toError(error);

        if (err.message === 'auth/email-already-in-use') {
          setErrorMsg('This email is already in use!');
        }

        if (err.message === 'auth/invalid-email') {
          setErrorMsg('The email is invalid!');
        }

        if (err.message === 'auth/weak-password') {
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
        <InputField
          reference={firstNameRef}
          placeholder="Enter first name"
          label="First name"
        />
        <InputField
          reference={lastNameRef}
          placeholder="Enter last name"
          label="Last name"
        />
        <InputField
          reference={emailRef}
          placeholder="Enter email"
          label="Email address"
          type="email"
        />
        <InputField
          reference={passwordRef}
          placeholder="Enter password"
          label="Password"
          type="password"
        />

        {errorMsg && <div className="error-message">{errorMsg}</div>}

        <Button className="btn-primary" type="submit">
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Registration;
