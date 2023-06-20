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
import { db } from '../../firebase';
import { toError } from '../../utils/error';

type allDayDataType = {
  date: string;
  deskId: string;
  userId: string;
};

export const saveDateRequest = async (
  allDayData: allDayDataType,
  floorName?: string
) => {
  const { date, deskId, userId } = allDayData;

  // check if calendar floor exists - not sure if it is needed for now
  // const check = await getIfCalendarExists(floorName);

  const calendarName = floorName ? `calendar-${floorName}` : 'calendar';

  const docRef = doc(db, calendarName, date);

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

export const getReservedDesksByDate = async (
  datePicked: string,
  imageMapId: string
) => {
  try {
    const docRef = doc(db, `calendar-${imageMapId}`, datePicked);
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

export const getIfCalendarExists = async (floorName: string) => {
  const calendarId = `calendar-${floorName}`;
  const calendarRef = await getAllReservations();

  calendarRef.forEach((doc) => {
    if (doc.id === calendarId) {
      return true;
    }
  });

  return false;
};
