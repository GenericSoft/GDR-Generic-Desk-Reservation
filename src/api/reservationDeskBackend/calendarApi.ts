import { db } from '../../firebase';
import {
  DocumentData,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { toError } from '../../utils/error';

type allDayDataType = {
  date: string;
  deskId: string;
  userId: string;
};

export const saveDateRequest = async (allDayData: allDayDataType) => {
  const { date, deskId, userId } = allDayData;
  const docRef = doc(db, 'calendar', date);

  // TODO: if date exist, an update to the document must be made
  const data = {
    day: date,
    desks: [
      {
        deskId,
        usersArray: [
          {
            hours: '12-15',
            userId: userId,
          },
        ],
      },
    ],
  };

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //check if this desk id is already reserved and saved in firestore
      const isDeskAlreadyReserved = docSnap
        .data()
        .desks.filter((desk: DocumentData) => desk.deskId === deskId).length;

      if (isDeskAlreadyReserved) {
        let newUsersArray = null;
        let deskIdIndex = 0;

        docSnap.data().desks.forEach((element: DocumentData, index: number) => {
          if (element.deskId === deskId) {
            deskIdIndex = index;
            newUsersArray = element.usersArray;
            newUsersArray.push({
              hours: '15-17',
              userId: userId,
            });
          }
        });

        const updatedDesks = {
          deskId,
          usersArray: newUsersArray,
        };
        await updateDoc(docRef, {
          desks: arrayRemove(docSnap.data().desks[deskIdIndex]),
        });
        await updateDoc(docRef, {
          desks: arrayUnion(updatedDesks),
        });
      } else {
        // save new desk id for same date
        await updateDoc(docRef, {
          desks: arrayUnion({
            deskId,
            usersArray: [
              {
                hours: '12-15',
                userId: userId,
              },
            ],
          }),
        });
      }
    } else {
      //save new date
      await setDoc(docRef, data);
    }
  } catch (error) {
    toError(error);
  }
};

export const getReservedDesksByDate = async (datePicked: string) => {
  try {
    const docRef = doc(db, 'calendar', datePicked);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap;
    }
  } catch (error) {
    toError(error);
  }
};

export const getAllReservations = async () => {
  try {
    const usersCollection = query(collection(db, 'calendar'));
    const querySnapshot = await getDocs(usersCollection);
    return querySnapshot;
  } catch (error) {
    throw toError(error);
  }
};
