// import { db } from '../../firebase';
// import { collection, query, getDocs } from 'firebase/firestore';
// import { useRef, useEffect, useState } from 'react';

import Table from 'react-bootstrap/Table';
import TimeTableHeader from '../TimeTableHeader/TimeTableHeader';

import './TimeTable.scss';

const TimeTable = () => {
  // const mhb: any = async () => {
  //   console.log('here');
  //   const q = query(collection(db, 'users'));
  //   // const res = collection(db, 'users')
  //   const querySnapshot = await getDocs(q);
  //   console.log(querySnapshot.docs);
  //   querySnapshot.docs.forEach((e) => {
  //     console.log(e.data());
  //   });
  // };
  return (
    <>
      <div>testttt</div>
      {/* <TimeTableHeader /> */}
      <Table striped bordered hover>
        <thead>
          {/* <tr>
            <th>Friend</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
          </tr> */}
        </thead>
        <tbody>
          <tr>
            <td>Friends</td>
            <td
              colSpan={7}
              className="timetable-header-container pt-0 pb-0 pe-0 ps-0"
            >
              <TimeTableHeader />
            </td>
          </tr>
          <tr>
            <td>Zari</td>
            <td>H</td>
            <td>O</td>
            <td>O</td>
            <td>O</td>
            <td>H</td>
            <td>H</td>
            <td>H</td>
          </tr>
          <tr>
            <td>Kali</td>
            <td>H</td>
            <td>O</td>
            <td>O</td>
            <td>O</td>
            <td>H</td>
            <td>H</td>
            <td>H</td>
          </tr>
          <tr>
            <td>Nadi</td>
            {/* <td colSpan={2}>Larry the Bird</td> */}
            <td>H</td>
            <td>O</td>
            <td>O</td>
            <td>O</td>
            <td>H</td>
            <td>H</td>
            <td>H</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
export default TimeTable;
