import { combineReducers } from 'redux';

import { userType } from '../../interfaces/User';

import userReducer from './userReducer';
import roomReducer from './roomReducer';

import { Room } from '../../interfaces/Room';

export type RootReducerType = {
  user: userType;
  room: Room;
};

const rootReducer = combineReducers<RootReducerType>({
  user: userReducer,
  room: roomReducer,
});
export default rootReducer;
