import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'react-bootstrap';

import ModalContainer from '../../components/ModalContainer/ModalContainer';
import TimeTableHeader from '../../components/TimeTableHeader/TimeTableHeader';

import './Calendar.scss';
import Switch from '../../components/Switch/Switch';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
const Calendar = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<string>('');
  const [timeValue, setTimeValue] = useState('');
  const getDate = (currDate: string) => {
    setDate(currDate);
  };
  const handleOnClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? document
          .querySelector('.switch-btn input:not(#' + event.target.id + ')')
          ?.setAttribute('disabled', 'disabled')
      : document
          .querySelector('.switch-btn input:not(#' + event.target.id + ')')
          ?.removeAttribute('disabled');
  };
  const timepickerValue = (value: moment.Moment) => {
    setTimeValue(value.format('h:mm a'));
    console.log(timeValue);
  };
  const disabledHours = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 19, 20, 21, 22, 23];
  };
  return (
    <ModalContainer title="Viewer" navigateRoute="/dashboard">
      <TimeTableHeader getDate={getDate} />
      <div className="d-flex justify-content-center mt-5 mb-3">
        <Switch
          label="All day reservation"
          className="switch-btn"
          id="all-day-switch"
          handleOnClick={handleOnClick}
        />
        <Switch
          label="Pick a time slot for you reservation"
          className="switch-btn"
          id="timepicker-switch"
          handleOnClick={handleOnClick}
        />
        <TimePicker
          showSecond={false}
          onChange={timepickerValue}
          disabledHours={disabledHours}
          minuteStep={30}
        />
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
