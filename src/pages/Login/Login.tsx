import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import FormContainer from '../../components/FormContainer/FormContainer';
import InputField from '../../components/InputField/InputField';

import { toError } from '../../utils/error';
import { validateLogin } from '../../utils/validations';

import { useAppDispatch } from '../../redux/store';
import { loginUser } from '../../redux/reducers/userReducer';

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errorMsg, setErrorMsg] = useState<string>('');

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailRef.current === null || passwordRef.current === null) {
      return;
    }

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const formValues = {
      email,
      password,
    };

    // if (email && password) {
    try {
      errorMsg && setErrorMsg('');

      await dispatch(loginUser(formValues));

      //clear the input after successful submit
      emailRef.current.value = '';
      passwordRef.current.value = '';
      navigate('/dashboard', { replace: true });
    } catch (error) {
      const err = toError(error);
      const errMessage = validateLogin(err);
      setErrorMsg(errMessage);
    }
    // } else {
    //   setErrorMsg('Please fill all the fields!');
    // }
  };
  return (
    <FormContainer onClick={() => navigate('/register')} isLoginPage={true}>
      <h3 className="text-color-primary">Login</h3>
      <Form onSubmit={handleSubmit}>
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
          Login
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Login;
