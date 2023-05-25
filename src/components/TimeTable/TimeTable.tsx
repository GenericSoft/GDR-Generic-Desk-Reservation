import Table from 'react-bootstrap/Table';
import TimeTableHeader from '../TimeTableHeader/TimeTableHeader';
import { getAllUsers } from '../../api/reservationDeskBackend/getAllUsersApi';
import './TimeTable.scss';
import { useEffect, useState } from 'react';
import { DocumentData } from '@firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouseUser,
  faBuilding,
  faGamepad,
} from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'react-bootstrap';

const TimeTable = () => {
  const [users, setUsers] = useState<DocumentData>([]);

  const fetchUsers = async () => {
    const users = await getAllUsers();
    if (users) {
      setUsers(users);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

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
              <TimeTableHeader />
            </td>
          </tr>
          {users.docs ? (
            users.docs.map((user: DocumentData) => {
              return (
                <tr key={user.id}>
                  <td>{user.data().firstName}</td>
                  <td className="text-center">
                    <FontAwesomeIcon
                      icon={faHouseUser}
                      style={{ color: '#00c9b9' }}
                      size="lg"
                    />
                  </td>
                  <td className="text-center">
                    <FontAwesomeIcon
                      icon={faBuilding}
                      size="lg"
                      style={{ color: '#724d7e' }}
                    />
                  </td>
                  <td className="text-center">
                    <FontAwesomeIcon
                      icon={faBuilding}
                      size="lg"
                      style={{ color: '#724d7e' }}
                    />
                  </td>
                  <td className="text-center">
                    <FontAwesomeIcon
                      icon={faBuilding}
                      size="lg"
                      style={{ color: '#724d7e' }}
                    />
                  </td>
                  <td className="text-center">
                    <FontAwesomeIcon
                      icon={faHouseUser}
                      style={{ color: '#00c9b9' }}
                      size="lg"
                    />
                  </td>
                  <td className="text-center">
                    <FontAwesomeIcon
                      icon={faGamepad}
                      size="lg"
                      style={{ color: '#808080' }}
                    />
                  </td>
                  <td className="text-center">
                    <FontAwesomeIcon
                      icon={faGamepad}
                      size="lg"
                      style={{ color: '#808080' }}
                    />
                  </td>
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
