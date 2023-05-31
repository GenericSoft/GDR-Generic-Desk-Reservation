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

export { validateLogin, validateRegister };
