import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Switch from '../../components/Switch/Switch';
import TimePicker from 'rc-time-picker';
import { useAppSelector } from '../../redux/store';
import { saveDateRequest } from '../../api/reservationDeskBackend/calendarApi';
import isAfter from 'date-fns/isAfter';
import moment from 'moment';
import { format } from 'date-fns';
type HoursModalProps = {
  show: boolean;
  close: () => void;
  shownImageMap: string;
  currDate: string;
  deskId: string;
  reservedHours: string;
};

const HoursModal = ({
  show,
  close,
  shownImageMap,
  currDate,
  deskId,
  reservedHours,
}: HoursModalProps) => {
  // console.log(shownImageMap);
  const [timeValueFrom, setTimeValueFrom] = useState<Date | number>(0);
  const [timeValueTo, setTimeValueTo] = useState<Date | number>(0);
  const [isTimepickerVisible, setisTimepickerVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const userId = useAppSelector((state) => state.user.userId);

  const handleOnClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? document
          .querySelector('.switch-btn input:not(#' + event.target.id + ')')
          ?.setAttribute('disabled', 'disabled')
      : document
          .querySelector('.switch-btn input:not(#' + event.target.id + ')')
          ?.removeAttribute('disabled');
    setisTimepickerVisible(
      event.target.getAttribute('id') == 'timepicker-switch'
        ? event.target.checked
        : false
    );
  };

  const timepickerValueFrom = (value: moment.Moment) => {
    setTimeValueFrom(value.toDate());
  };
  const timepickerValueTo = (value: moment.Moment) => {
    setTimeValueTo(value.toDate());
  };

  const disabledHours = () => {
    console.log(reservedHours);
    const disabledArray: number[] = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 19, 20, 21, 22, 23,
    ];

    if (reservedHours) {
      const hoursArray = reservedHours.split(',');
      hoursArray.forEach((el) => {
        for (
          let i = Number(format(new Date(el.split('-')[0]).getTime(), 'k'));
          i <= Number(format(new Date(el.split('-')[1]).getTime(), 'k'));
          i++
        ) {
          disabledArray.push(i);
        }
      });
    }
    return disabledArray;
  };

  const handleSave = async () => {
    disabledHours();
    if (isTimepickerVisible && !timeValueFrom && !timeValueTo) {
      setErrorMsg('Please, pick a time for your reservation');
      return;
    }
    if (isAfter(timeValueFrom, timeValueTo)) {
      setErrorMsg('End time should be after start time!');
      return;
    }
    const allDayData = {
      date: currDate,
      isAllDayReservation: !isTimepickerVisible,
      timeFrom: timeValueFrom,
      timeTo: timeValueTo,
      deskId,
      userId,
    };
    console.log(allDayData);
    if (deskId) {
      const imageMapId = shownImageMap;
      await saveDateRequest(allDayData, imageMapId);
      //   navigate('/dashboard');
    }
    close();
  };
  return (
    <>
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {shownImageMap}
          <div className="d-flex justify-content-center mt-5 mb-3">
            {reservedHours}
            {!reservedHours && (
              <>
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
              </>
            )}
            {reservedHours && (
              <Switch
                label="Pick a time slot for you reservation"
                className="switch-btn"
                id="timepicker-switch"
                handleOnClick={handleOnClick}
                checked={true}
              />
            )}
            <div>
              <span>From </span>
              <TimePicker
                showSecond={false}
                onChange={timepickerValueFrom}
                disabledHours={disabledHours}
                minuteStep={30}
                disabled={!isTimepickerVisible}
              />
              <span>To </span>
              <TimePicker
                showSecond={false}
                onChange={timepickerValueTo}
                disabledHours={disabledHours}
                minuteStep={30}
                disabled={!isTimepickerVisible}
              />
            </div>
          </div>
          <div className="error-message">{errorMsg}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HoursModal;
