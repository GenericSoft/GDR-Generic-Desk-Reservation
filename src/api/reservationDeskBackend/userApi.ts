import { createUserWithEmailAndPassword } from 'firebase/auth';
import { apiUserType, userType } from '../../interfaces/User';
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

export const registerUserRequest = async (userData: apiUserType) => {
  try {
    const { email, password } = userData;
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();

    const user = {
      userId: result.user.uid,
      email: result.user.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      token,
    };

    return user;
  } catch (error: any) {
    const newError = new Error(error.code);
    throw newError;
  }
};

export const createUserRequest = async (userData: {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}) => {
  try {
    const { userId, firstName, lastName, email } = userData;
    await setDoc(doc(db, 'users', userId), {
      userId,
      email,
      firstName,
      lastName,
      profilePic: '',
      jobRole: '',
      myDesk: {
        deskNum: 0,
      },
    });
  } catch (error: any) {
    throw Error(error.message);
  }
};
