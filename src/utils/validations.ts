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
type userInputsType = {
  firstName: string;
  lastName: string;
  occupation: string;
  country: string;
  birthday: string;
};
const validateEditProfile = (userInputsData: userInputsType) => {
  const { firstName, lastName, occupation, country, birthday } = userInputsData;
  if (firstName.length === 0 || lastName.length) {
    return 'Please fill all the fields!';
  }
  if (occupation.length === 0) {
    return 'Please add your job role!';
  }
  if (country.length === 0) {
    return 'Please enter country!';
  }
  if (birthday.length === 0) {
    return 'Please enter country!';
  }
  return '';
};

export { validateLogin, validateRegister, validateEditProfile };
