import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
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
  checkIfReservationIsSaved: (isSaved: string) => void;
};

const HoursModal = ({
  show,
  close,
  shownImageMap,
  currDate,
  deskId,
  reservedHours,
  checkIfReservationIsSaved,
}: HoursModalProps) => {
  const [timeValueFrom, setTimeValueFrom] = useState<Date | number>(0);
  const [timeValueTo, setTimeValueTo] = useState<Date | number>(0);
  const [isTimepickerVisible, setIsTimepickerVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isReservationOptionChecked, setIsReservationOptionChecked] =
    useState(false);

  const userId = useAppSelector((state) => state.user.userId);

  //enable/disable switches, check if user chose option before save, control visibility of timepickers
  const handleOnClickSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked && errorMsg ? setErrorMsg('') : null;

    setIsReservationOptionChecked(event.target.checked);

    event.target.checked
      ? document
          .querySelector('.switch-btn input:not(#' + event.target.id + ')')
          ?.setAttribute('disabled', 'disabled')
      : document
          .querySelector('.switch-btn input:not(#' + event.target.id + ')')
          ?.removeAttribute('disabled');

    setIsTimepickerVisible(
      event.target.getAttribute('id') == 'timepicker-switch'
        ? event.target.checked
        : false
    );
  };

  //set values to timepickers
  const timepickerValueFrom = (value: moment.Moment) => {
    if (value) {
      setTimeValueFrom(value.toDate());
    }
  };
  const timepickerValueTo = (value: moment.Moment) => {
    if (value) {
      setTimeValueTo(value.toDate());

      timeValueFrom && value ? setErrorMsg('') : null;

      //check if the reservation is not overlapping another one
      const disabledHoursArr = disabledHours();
      let startHour = 0;
      if (typeof timeValueFrom == 'object') {
        startHour = Number(format(timeValueFrom.getTime(), 'k'));
      }
      const endHour = Number(format(value.toDate().getTime(), 'k'));
      disabledHoursArr.every(
        (hour: number) => !(hour > startHour && hour < endHour)
      )
        ? setErrorMsg('')
        : setErrorMsg(
            'You cannot set this time as end hour, because the desk is already reserved for some hours between!'
          );
    } else {
      setTimeValueTo(0);
    }
  };

  //set already reserved hours as disabled to timepickers
  const disabledHours = () => {
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
    //validations before save
    if (!isReservationOptionChecked) {
      setErrorMsg('Please, select time option for your reservation!');
      return;
    }
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

    if (deskId) {
      const imageMapId = shownImageMap;
      await saveDateRequest(allDayData, imageMapId);
      await saveDateRequest(allDayData);
      allDayData.isAllDayReservation
        ? checkIfReservationIsSaved('savedAllDay')
        : checkIfReservationIsSaved('saved');
      //TO DO: Add alert > Reservation successfully saved
    }
    close();
  };

  useEffect(() => {
    errorMsg ? setErrorMsg('') : null;

    if (reservedHours) {
      setIsTimepickerVisible(true);
      setIsReservationOptionChecked(true);
    }
    if (!show) {
      setIsTimepickerVisible(false);
      setIsReservationOptionChecked(false);
    }
  }, [show]);
  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          checkIfReservationIsSaved('closex');
          close();
        }}
      >
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title className="text-white">Reservation hours</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {!reservedHours && (
              <>
                <Row className="mb-4 mt-2">
                  <Col>
                    <Switch
                      label="All day reservation"
                      className="switch-btn"
                      id="all-day-switch"
                      handleOnClick={handleOnClickSwitch}
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Switch
                      label="Pick a time slot for you reservation"
                      className="switch-btn"
                      id="timepicker-switch"
                      handleOnClick={handleOnClickSwitch}
                    />
                  </Col>
                </Row>
              </>
            )}
            {reservedHours && (
              <Switch
                label="Pick a time slot for you reservation"
                className="switch-btn"
                id="timepicker-switch"
                handleOnClick={handleOnClickSwitch}
                checked={true}
              />
            )}
            <Row className="mb-3">
              <Col sm={2}>
                <span className={!isTimepickerVisible ? 'opacity-5' : ''}>
                  From{' '}
                </span>
              </Col>
              <Col>
                <TimePicker
                  showSecond={false}
                  onChange={timepickerValueFrom}
                  disabledHours={disabledHours}
                  minuteStep={60}
                  disabled={reservedHours ? false : !isTimepickerVisible}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={2}>
                <span className={!isTimepickerVisible ? 'opacity-5' : ''}>
                  To{' '}
                </span>
              </Col>
              <Col>
                <TimePicker
                  showSecond={false}
                  onChange={timepickerValueTo}
                  disabledHours={disabledHours}
                  minuteStep={60}
                  disabled={reservedHours ? false : !isTimepickerVisible}
                />
              </Col>
            </Row>
          </div>
          <div className="error-message">{errorMsg}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              close();
              checkIfReservationIsSaved('close');
            }}
          >
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
