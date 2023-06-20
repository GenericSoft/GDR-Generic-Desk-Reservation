import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'react-bootstrap';

import ModalContainer from '../../components/ModalContainer/ModalContainer';
import TimeTableHeader from '../../components/TimeTableHeader/TimeTableHeader';

import './Calendar.scss';

const Calendar = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<string>('');

  const getDate = (currDate: string) => {
    setDate(currDate);
  };

  return (
    <ModalContainer title="Viewer" navigateRoute="/dashboard">
      <TimeTableHeader getDate={getDate} />
      <div className="d-flex justify-content-center mt-5 mb-3">
        {/* will be useful for later  */}
        {/* <Form>
          <Form.Check checked type="radio" label="All day event" id="1" />
        </Form> */}
      </div>
      <div className="d-flex justify-content-center mt-3 mb-5">
        <Button
          onClick={() => navigate('/view', { state: { currDate: date } })}
        >
          SAVE
        </Button>
      </div>
    </ModalContainer>
  );
};

export default Calendar;
