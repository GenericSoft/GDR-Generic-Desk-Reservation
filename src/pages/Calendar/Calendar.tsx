import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ModalContainer from '../../components/ModalContainer/ModalContainer';
import TimeTableHeader from '../../components/TimeTableHeader/TimeTableHeader';

import { Button } from 'react-bootstrap';

const Calendar = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<string>('');

  const getDate = (currDate: string) => {
    setDate(currDate);
  };

  return (
    <ModalContainer title="Viewer" navigateRoute="/dashboard">
      <TimeTableHeader getDate={getDate} />
      <Button onClick={() => navigate('/view', { state: { currDate: date } })}>
        SAVE
      </Button>
    </ModalContainer>
  );
};

export default Calendar;
