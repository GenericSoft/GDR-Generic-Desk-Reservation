import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { registerUserType, firebaseUserType } from '../../interfaces/User';
import { auth, db } from '../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { toError } from '../../utils/error';

export const registerUserRequest = async (userData: registerUserType) => {
  try {
    const { email, password, firstName, lastName } = userData;
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();

    await createUserRequest({
      userId: result.user.uid,
      firstName,
      lastName,
      email: result.user.email as string,
    });

    const user = {
      userId: result.user.uid,
      email: result.user.email as string,
      firstName: userData.firstName,
      lastName: userData.lastName,
      token,
    };

    return user;
  } catch (error) {
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

export const loginUserRequest = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const { email, password } = userData;

    const response = await signInWithEmailAndPassword(auth, email, password);
    const token = await response.user.getIdToken();

    const userInfo = await retrieveUserInformation(response.user.uid);

    const user = {
      userId: response.user.uid,
      email: response.user.email as string,
      firstName: userInfo && userInfo.firstName,
      lastName: userInfo && userInfo.lastName,
      token,
      profilePic: userInfo?.profilePic,
    };

    return user;
  } catch (error) {
    throw toError(error, true);
  }
};

export const retrieveUserInformation = async (userId: string) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log(docSnap.data());
    return docSnap.data() as firebaseUserType;
  } else {
    console.log('No such document');
  }
};
