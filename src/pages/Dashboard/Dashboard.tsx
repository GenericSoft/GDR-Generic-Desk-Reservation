import { useState } from 'react';

import Footer from '../../components/Footer/Footer';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import TimeTable from '../../components/TimeTable/TimeTable';
import DayViewer from '../../components/DayViewer/DayViewer';

import { DocumentData, QuerySnapshot } from 'firebase/firestore';

const Dashboard = () => {
  const [currentReservations, setCurrentReservations] =
    useState<QuerySnapshot<DocumentData>>();
  const [currentUsers, setCurrentUsers] =
    useState<QuerySnapshot<DocumentData>>();

  return (
    <>
      <NavigationBar />
      <DayViewer
        currentReservations={currentReservations}
        currentUsers={currentUsers}
      />
      <TimeTable
        setCurrentReservations={setCurrentReservations}
        setCurrentUsers={setCurrentUsers}
      />
      <Footer />
    </>
  );
};
export default Dashboard;
