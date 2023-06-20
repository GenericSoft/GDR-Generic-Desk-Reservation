import React, { useEffect, useState } from 'react';
import { endOfDay, format } from 'date-fns';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';

import DayViewerCard from '../DayViewerCard/DayViewerCard';

import { userType } from '../../interfaces/User';

import './DayViewer.scss';

type DayViewerProps = {
  currentReservations: QuerySnapshot<DocumentData> | undefined;
  currentUsers: QuerySnapshot<DocumentData> | undefined;
};

const DayViewer = ({ currentReservations, currentUsers }: DayViewerProps) => {
  const currentDay = format(endOfDay(new Date()), 'dd-MMM-y');
  const [usersWorkingFromOffice, setUsersWorkingFromOffice] = useState<
    userType[]
  >([]);
  const [usersWorkingFromHome, setUsersWorkingFromHome] = useState<userType[]>(
    []
  );

  const getUsersWorkplace = () => {
    const workingFromOffice: userType[] = [];
    const workingFromHome: userType[] = [];
    let currentDayExists: boolean;

    currentUsers?.forEach((doc) => {
      const user = doc.data() as userType;
      const userId = user.userId;

      currentReservations?.forEach((dateDoc) => {
        const dateInfo = dateDoc.data();
        if (dateInfo.day === currentDay) {
          currentDayExists = true;
          dateInfo.desks.forEach((desk: { deskId: string; usersArray: [] }) => {
            desk.usersArray.forEach(
              (deskUser: { hours: string; userId: string }) => {
                if (
                  deskUser.userId === userId &&
                  !workingFromOffice.includes(user)
                ) {
                  workingFromOffice.push(user);
                }
              }
            );
          });
          if (!workingFromOffice.includes(user)) {
            workingFromHome.push(user);
          }
        }
      });
      if (!currentDayExists) {
        workingFromHome.push(user);
      }
    });

    setUsersWorkingFromHome(workingFromHome);
    setUsersWorkingFromOffice(workingFromOffice);
  };

  useEffect(() => {
    if (currentReservations && currentUsers) {
      getUsersWorkplace();
    }
  }, [currentReservations, currentUsers]);

  return (
    <>
      <h2 className="current-day">{currentDay}</h2>
      <div className="day-viewers-wrapper">
        <DayViewerCard
          title="Working from the office"
          titleColor="#724d7e"
          users={usersWorkingFromOffice}
        />
        <DayViewerCard
          title="Working from home"
          titleColor="#00c9b9"
          users={usersWorkingFromHome}
        />
      </div>
    </>
  );
};

export default DayViewer;
