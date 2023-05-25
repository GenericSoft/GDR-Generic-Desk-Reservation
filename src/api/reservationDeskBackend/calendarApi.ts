import { db } from '../../firebase';
import {
  doc,
  setDoc,
  // getDoc,
  // DocumentReference,
  // DocumentData,
} from 'firebase/firestore';

type allDayDataType = {
  date: string;
  deskId: string;
  userId: string;
};

export const saveDateRequest = async (allDayData: allDayDataType) => {
  const { date, deskId, userId } = allDayData;
  const docRef = doc(db, 'calendar', date);

  // const check = await checkIfDateExists(docRef);

  // TODO: if date exist, an update to the document must be made

  const data = {
    day: date,
    desks: [
      {
        deskId,
        usersArray: [userId],
      },
    ],
  };

  // if date does not exist, it creates a new document
  await setDoc(docRef, data);
};

//checks if the added date already exist in firestore
// const checkIfDateExists = async (ref: DocumentReference<DocumentData>) => {
//   const docSnap = await getDoc(ref);

//   if (docSnap.exists()) {
//     return true;
//   } else {
//     console.log('No such document');
//     return false;
//   }
// };
