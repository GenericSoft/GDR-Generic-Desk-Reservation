import Table from 'react-bootstrap/Table';
import TimeTableHeader from '../TimeTableHeader/TimeTableHeader';

import './TimeTable.scss';

const TimeTable = () => {
  return (
    <>
      <Table striped bordered hover>
        <thead></thead>
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
