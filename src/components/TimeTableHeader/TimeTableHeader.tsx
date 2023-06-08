import { useEffect, useState } from 'react';
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
  startOfMonth,
  subMonths,
  addMonths,
  eachDayOfInterval,
  sub,
} from 'date-fns';
import './TimeTableHeader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { fr } from 'date-fns/locale';

type CalendarType = {
  getDate?: (currDate: string) => void;
  onShowWeek?: (week: Date) => void;
};

const Calendar = ({ getDate, onShowWeek }: CalendarType) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(new Date());
  // const [daysOfMonth, setDaysOfMonth] = useState([]);
  // const [nextMonth, setNextMonth] = useState(
  //   addMonths(new Date(currentMonth), 1)
  // );
  const location = useLocation();

  const isInReservePage = location.pathname === '/calendar';

  useEffect(() => {
    if (onShowWeek) {
      onShowWeek(currentMonth);
      // console.log(currentMonth);
    }
  }, [currentMonth]);

  useEffect(() => {
    setCurrentMonth(startOfMonth(new Date()));
    setFirstDayOfWeek(startOfWeek(new Date(), { locale: fr, weekStartsOn: 1 }));
    console.log(firstDayOfWeek);
  }, []);

  // useEffect(() => {
  //   console.log('CURRENT MONTH', currentMonth);

  //   setNextMonth(addMonths(new Date(currentMonth), 1));
  // }, [currentMonth]);

  // console.log('nextMonth', nextMonth);
  // console.log('currentMonth', currentMonth);
  // console.log('selectedDate', selectedDate);

  // console.log('currMonth', currMonth);
  // console.log('firstDayOfWeek', firstDayOfWeek);

  const changeWeekHandle = (btnType: string) => {
    if (btnType === 'prev') {
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === 'next') {
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
    console.log(currentWeek);
  };

  const changeMonthHandle = (btnType: string) => {
    if (btnType === 'prev') {
      setCurrentMonth(startOfMonth(subMonths(new Date(currentMonth), 1)));
      console.log('PREV ', startOfMonth(subMonths(new Date(currentMonth), 1)));
    }

    if (btnType === 'next') {
      setCurrentMonth(addMonths(new Date(currentMonth), 1));
      console.log('NEXT ', addMonths(new Date(currentMonth), 1));
    }
  };

  const renderMonthDays = () => {
    // console.log('RENDER MONTH', currentMonth);
    // console.log('RENDER MONTh, ', sub(nextMonth, { days: 1 }));

    const arr = eachDayOfInterval({
      start: currentMonth,
      end: sub(addMonths(new Date(currentMonth), 1), { days: 1 }),
    });

    // console.log(arr);

    return arr;
  };

  const onDateClickHandle = (day: Date) => {
    if (location.pathname === '/calendar') {
      const date = format(day, 'dd-MMM-y');
      console.log(date);

      // @ts-ignore
      getDate(String(date));
    }

    setSelectedDate(day);
    console.log(day);
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
    console.log('renderCells');

    const arr = renderMonthDays();
    // console.log(arr[0]);
    // console.log(arr[arr.length - 1]);

    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = isInReservePage
      ? arr[arr.length - 1]
      : lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
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
          <div
            className="icon"
            onClick={
              isInReservePage
                ? () => changeMonthHandle('prev')
                : () => changeWeekHandle('prev')
            }
          >
            <FontAwesomeIcon
              icon={faCircleChevronLeft}
              size="xl"
              style={{ color: '#724d7e' }}
            />
          </div>
        </div>
        <span>{format(currentMonth, dateFormat)}</span>
        <div
          className="col col-end"
          onClick={
            isInReservePage
              ? () => changeMonthHandle('next')
              : () => changeWeekHandle('next')
          }
        >
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
      {/* <button onClick={renderMonthDays}>CLICK ME</button> */}
    </div>
  );
};

export default Calendar;
