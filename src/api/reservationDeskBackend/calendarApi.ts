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
  isAllDayReservation: boolean;
  timeFrom: Date | number;
  timeTo: Date | number;
  deskId: string;
  userId: string;
};

export const saveDateRequest = async (
  allDayData: allDayDataType,
  floorName?: string
) => {
  const { date, isAllDayReservation, timeFrom, timeTo, deskId, userId } =
    allDayData;

  // check if calendar floor exists - not sure if it is needed for now
  // const check = await getIfCalendarExists(floorName);

  const calendarName = floorName ? `calendar-${floorName}` : 'calendar';

  const docRef = doc(db, calendarName, date);

  const userArrayObject = isAllDayReservation
    ? { userId }
    : { timeFrom, timeTo, userId };

  const data = {
    day: date,
    desks: [
      {
        deskId,
        usersArray: [userArrayObject],
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

      if (!isAllDayReservation && isDeskAlreadyReserved) {
        let newUsersArray = null;
        let deskIdIndex = 0;

        docSnap.data().desks.forEach((element: DocumentData, index: number) => {
          if (element.deskId === deskId) {
            deskIdIndex = index;
            newUsersArray = element.usersArray;
            newUsersArray.push({
              timeFrom,
              timeTo,
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
        const userArrayObject = isAllDayReservation
          ? { userId }
          : { timeFrom, timeTo, userId };
        await updateDoc(docRef, {
          desks: arrayUnion({
            deskId,
            usersArray: [userArrayObject],
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
