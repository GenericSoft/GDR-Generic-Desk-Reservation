import { Car } from '../../interfaces/Car';

import { GET_CARS_REQUEST, GET_CARS_SUCCESS, GET_CARS_ERROR } from './types';

// get cars
export function getCars() {
  return {
    type: GET_CARS_REQUEST,
  };
}

export function getCarsSuccess(payload: Car[]) {
  return {
    type: GET_CARS_SUCCESS,
    payload,
  };
}

export function getCarsError(payload: string) {
  return {
    type: GET_CARS_ERROR,
    payload,
  };
}
