type userInputsType = {
  firstName: string;
  lastName: string;
};

const validateLogin = (err: Error) => {
  if (err.message === 'fields not filled') {
    return 'Please fill all the fields!';
  }

  if (err.message === 'auth/wrong-password') {
    return 'Email or password is incorrect!';
  }

  if (err.message === 'auth/user-not-found') {
    return 'No such user exists!';
  }

  return 'An unexpected error occurred!';
};

const validateRegister = (err: Error) => {
  if (err.message === 'fields not filled') {
    return 'Please fill all the fields!';
  }

  if (err.message === 'auth/email-already-in-use') {
    return 'This email is already in use!';
  }

  if (err.message === 'auth/invalid-email') {
    return 'The email is invalid!';
  }

  if (err.message === 'auth/weak-password') {
    return 'Password must be at least 6 characters!';
  }

  return 'An unexpected error occurred!';
};

const validateEdit = (err: Error) => {
  if (err) {
    return 'An unexpected error occurred!';
  }
};

const validateEditProfile = (userInputsData: userInputsType) => {
  const { firstName, lastName } = userInputsData;
  if (firstName.length === 0 || lastName.length === 0) {
    return 'Please fill all the fields!';
  }
  return '';
};

export { validateLogin, validateRegister, validateEditProfile, validateEdit };
