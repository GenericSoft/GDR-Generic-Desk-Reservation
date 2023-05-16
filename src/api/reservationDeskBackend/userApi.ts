import { createUserWithEmailAndPassword } from 'firebase/auth';
import { apiUserType } from '../../interfaces/User';
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { toError } from '../../utils/error';

export const registerUserRequest = async (userData: apiUserType) => {
  try {
    const { email, password } = userData;
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();

    const user = {
      userId: result.user.uid,
      email: result.user.email as string,
      firstName: userData.firstName,
      lastName: userData.lastName,
      token,
    };

    return user;
  } catch (error) {
    // const firebaseError = error as FirebaseError;
    // throw new Error(firebaseError.code);
    throw toError(error, true);
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
  } catch (error) {
    throw toError(error);
  }
};
