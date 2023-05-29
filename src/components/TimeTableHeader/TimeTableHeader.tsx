import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
} from 'date-fns';
import './TimeTableHeader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from '@fortawesome/free-solid-svg-icons';

type CalendarType = {
  getDate?: (currDate: string) => void;
};

const Calendar = ({ getDate }: CalendarType) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());

  const location = useLocation();

  const changeWeekHandle = (btnType: string) => {
    if (btnType === 'prev') {
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
      console.log(currentWeek);
    }
    if (btnType === 'next') {
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

  const onDateClickHandle = (day: Date) => {
    if (location.pathname === '/calendar') {
      const date = format(day, 'dd-MMM-y');

      // @ts-ignore
      getDate(String(date));
    }

    setSelectedDate(day);
  };

  const renderDays = () => {
    const dateFormat = 'EEE';
    const days = [];
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };
  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = 'd';
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;

        days.push(
          <div
            className={`col cell ${
              isSameDay(day, selectedDate) ? 'selected' : ''
            }`}
            key={day.getTime()}
            onClick={() => {
              onDateClickHandle(cloneDay);
            }}
          >
            <span className="number">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day.getTime()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };
  const renderFooter = () => {
    const dateFormat = 'MMM yyyy';

    return (
      <div className="header mt-2 pb-2">
        <div className="col col-start">
          <div className="icon" onClick={() => changeWeekHandle('prev')}>
            <FontAwesomeIcon
              icon={faCircleChevronLeft}
              size="xl"
              style={{ color: '#724d7e' }}
            />
          </div>
        </div>
        <span>{format(currentMonth, dateFormat)}</span>
        <div className="col col-end" onClick={() => changeWeekHandle('next')}>
          <div className="icon">
            <FontAwesomeIcon
              icon={faCircleChevronRight}
              size="xl"
              style={{ color: '#724d7e' }}
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="calendar">
      {renderFooter()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
