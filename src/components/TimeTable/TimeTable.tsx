import { useEffect, useState } from 'react';

import { Spinner } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { QuerySnapshot } from 'firebase/firestore';
import { DocumentData } from '@firebase/firestore';

import { format, startOfWeek, add } from 'date-fns';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser, faBuilding } from '@fortawesome/free-solid-svg-icons';

import TimeTableHeader from '../TimeTableHeader/TimeTableHeader';
import { getAllUsers } from '../../api/reservationDeskBackend/getAllUsersApi';
import { getAllReservations } from '../../api/reservationDeskBackend/calendarApi';

import './TimeTable.scss';

type TimeTableProps = {
  setCurrentReservations: React.Dispatch<QuerySnapshot<DocumentData>>;
  setCurrentUsers: React.Dispatch<QuerySnapshot<DocumentData>>;
};

const TimeTable = ({
  setCurrentReservations,
  setCurrentUsers,
}: TimeTableProps) => {
  const [users, setUsers] = useState<DocumentData>([]);
  const [reservations, setReservations] = useState<DocumentData>([]);
  const [shownWeek, setShownWeek] = useState(new Date());
  const [week, setWeek] = useState<string[]>([]);

  const fetchUsers = async () => {
    const users = await getAllUsers();
    if (users) {
      setUsers(users);
      setCurrentUsers(users);
    }
  };

  const fetchReservations = async () => {
    const deskReservations = await getAllReservations();
    if (deskReservations) {
      setReservations(deskReservations);
      setCurrentReservations(deskReservations);
    }
  };

  //when user clicks on < > buttons, show the chosen week days
  const getDaysForTheChosenWeek = () => {
    const startDate = startOfWeek(shownWeek, { weekStartsOn: 1 });
    const currentWeek = [];
    let tomorrowFns = startDate;
    for (let i = 1; i <= 7; i++) {
      currentWeek.push(format(tomorrowFns, 'dd-MMM-y'));
      tomorrowFns = add(tomorrowFns, {
        days: 1,
      });
    }
    setWeek(currentWeek);
  };

  useEffect(() => {
    fetchUsers();
    fetchReservations();
  }, []);

  useEffect(() => {
    getDaysForTheChosenWeek();
  }, [shownWeek]);

  return (
    <>
      <Table striped bordered hover className="mt-5 mb-5 rounded">
        <thead></thead>
        <tbody>
          <tr>
            <td className="text-center pt-5">Friends</td>
            <td
              colSpan={7}
              className="timetable-header-container pt-0 pb-0 pe-0 ps-0"
            >
              <TimeTableHeader onShowWeek={setShownWeek} />
            </td>
          </tr>
          {/* print all users in table  */}
          {users.docs && reservations.docs ? (
            users.docs.map((user: DocumentData) => {
              return (
                <tr key={user.id}>
                  <td>{user.data().firstName}</td>
                  {/* print all days from chosen week in table  */}
                  {week.map((dayFromWeek) => {
                    const usersWithReservationForCurrDeskInCurrDay: string[] =
                      [];
                    // check which days in the chosen week have reservations
                    reservations.docs.map((doc: DocumentData) => {
                      if (doc.data().day == dayFromWeek) {
                        // check which users have reservations for current day in the chosen week
                        doc.data().desks.forEach((desk: DocumentData) => {
                          desk.usersArray.forEach((user: DocumentData) => {
                            usersWithReservationForCurrDeskInCurrDay.push(
                              user.userId
                            );
                          });
                        });
                      }
                    });
                    if (
                      reservations.docs.filter(
                        (doc: DocumentData) => doc.data().day == dayFromWeek
                      ).length &&
                      usersWithReservationForCurrDeskInCurrDay.filter(
                        (userSavedId: string) => userSavedId == user.id
                      ).length
                    ) {
                      // if this user has reservation on the current day, show the building icon
                      return (
                        <td className="text-center" key={dayFromWeek}>
                          <FontAwesomeIcon
                            icon={faBuilding}
                            size="lg"
                            style={{ color: '#724d7e' }}
                          />
                        </td>
                      );
                    } else {
                      // if this user has no reservation, print the house icon
                      return (
                        <td className="text-center" key={dayFromWeek}>
                          <FontAwesomeIcon
                            icon={faHouseUser}
                            style={{ color: '#00c9b9' }}
                            size="lg"
                          />
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={8} className="text-center">
                <Spinner animation="grow" className="bg-primary" />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};
export default TimeTable;
