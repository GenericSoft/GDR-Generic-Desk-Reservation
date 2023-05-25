import { db } from '../../firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { toError } from '../../utils/error';

export const getAllUsers = async () => {
  try {
    const usersCollection = query(collection(db, 'users'));
    const querySnapshot = await getDocs(usersCollection);
    return querySnapshot;
  } catch (error) {
    throw toError(error);
  }
};
