import { useState } from 'react';

import { DocumentData, QuerySnapshot } from 'firebase/firestore';

import Footer from '../../components/Footer/Footer';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import TimeTable from '../../components/TimeTable/TimeTable';
import DayViewer from '../../components/DayViewer/DayViewer';

import { fireAlert } from '../../utils/alert';

const Dashboard = () => {
  const [currentReservations, setCurrentReservations] =
    useState<QuerySnapshot<DocumentData>>();
  const [currentUsers, setCurrentUsers] =
    useState<QuerySnapshot<DocumentData>>();

  return (
    <>
      <NavigationBar />
      <button
        onClick={() =>
          fireAlert('success', {
            text: 'Text',
            title: 'Title',
            confirmButtonText: 'Confirm',
            confirmText: 'confirm text',
            confirmTitle: 'confirm title',
            executeAfterConfirmFunction: () => {
              console.log('TEST');
            },
          })
        }
      >
        Alert
      </button>

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
