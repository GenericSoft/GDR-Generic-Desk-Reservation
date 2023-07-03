import { format, isAfter } from 'date-fns';

type userInputsType = {
  firstName: string;
  lastName: string;
};

type ReservationOptionTypes = {
  isReservationOptionChecked: boolean;
  isTimepickerVisible: boolean;
  timeValueFrom: Date | number;
  timeValueTo: Date | number;
};

const validateLogin = (err: Error) => {
  if (err.message === 'fields not filled') {
    return 'Please fill all the fields!';
  }

  if (err.message === 'auth/wrong-password') {
    return 'Email or password is incorrect!';
  }

  if (err.message === 'auth/user-not-found') {
    return 'No such user exists!';
  }

  return 'An unexpected error occurred!';
};

const validateRegister = (err: Error) => {
  if (err.message === 'fields not filled') {
    return 'Please fill all the fields!';
  }

  if (err.message === 'auth/email-already-in-use') {
    return 'This email is already in use!';
  }

  if (err.message === 'auth/invalid-email') {
    return 'The email is invalid!';
  }

  if (err.message === 'auth/weak-password') {
    return 'Password must be at least 6 characters!';
  }

  return 'An unexpected error occurred!';
};

const validateEdit = (err: Error) => {
  if (err) {
    return 'An unexpected error occurred!';
  }
  return '';
};

const validateEditProfile = (userInputsData: userInputsType) => {
  const { firstName, lastName } = userInputsData;
  if (firstName.length === 0 || lastName.length === 0) {
    return 'Please fill all the fields!';
  }
  return '';
};

const validateHoursReservation = (
  reservationOptions: ReservationOptionTypes
) => {
  if (!reservationOptions.isReservationOptionChecked) {
    return 'Please, select time option for your reservation!';
  }
  if (
    reservationOptions.isTimepickerVisible &&
    !reservationOptions.timeValueFrom &&
    !reservationOptions.timeValueTo
  ) {
    return 'Please, pick a time for your reservation!';
  }
  if (
    isAfter(reservationOptions.timeValueFrom, reservationOptions.timeValueTo)
  ) {
    return 'End time should be after start time!';
  }
};

//check if the reservation is not overlapping another one
const isValidReservationTime = (
  disabledHours: () => number[],
  startTime: Date,
  endTime: Date
) => {
  const disabledHoursArr = disabledHours();

  const startHour = Number(format(startTime.getTime(), 'k'));
  const endHour = Number(format(endTime.getTime(), 'k'));

  if (
    disabledHoursArr.every(
      (hour: number) => !(hour > startHour && hour < endHour)
    )
  ) {
    if (startHour == endHour) {
      return 'You can not reserve a desk for less than 1 hour!';
    } else {
      return '';
    }
  } else {
    return 'You cannot set this time as end hour, because the desk is already reserved for some hours between!';
  }
};

export {
  validateLogin,
  validateRegister,
  validateEditProfile,
  validateEdit,
  validateHoursReservation,
  isValidReservationTime,
};
