import React, { useRef, useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import FormContainer from '../../components/FormContainer/FormContainer';
import InputField from '../../components/InputField/InputField';

import { useAppDispatch } from '../../redux/store';
import { registerUser } from '../../redux/reducers/userReducer';

import './Registration.scss';
import { toError } from '../../utils/error';
import { useNavigate } from 'react-router';

const Registration = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

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

        //clear the input after successful submit
        firstNameRef.current.value = '';
        lastNameRef.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = '';
        navigate('/dashboard', { replace: true });
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
    <FormContainer onClick={() => navigate('/login')} isLoginPage={false}>
      <h3 className="text-color-primary">Registration</h3>
      <Form onSubmit={handleSubmit}>
        <InputField
          className="mb-3 one-line inp"
          reference={firstNameRef}
          placeholder="&nbsp;"
          label="First name"
        />
        <InputField
          className="mb-3 one-line inp"
          reference={lastNameRef}
          placeholder="&nbsp;"
          label="Last name"
        />
        <InputField
          className="mb-3 one-line inp"
          reference={emailRef}
          placeholder="&nbsp;"
          label="Email address"
          type="email"
        />
        <InputField
          className="mb-3 one-line inp"
          reference={passwordRef}
          placeholder="&nbsp;"
          label="Password"
          type="password"
        />

        {errorMsg && <div className="error-message">{errorMsg}</div>}

        <Button className="btn-primary mt-4" type="submit">
          Join the Club
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Registration;
