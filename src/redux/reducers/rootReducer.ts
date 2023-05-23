import { combineReducers } from 'redux';

import { userType } from '../../interfaces/User';

import userReducer from './userReducer';
import roomReducer from './imageMapReducer';

import { Room } from '../../interfaces/ImageMap';

export type RootReducerType = {
  user: userType;
  room: Room;
};

const rootReducer = combineReducers<RootReducerType>({
  user: userReducer,
  room: roomReducer,
});
export default rootReducer;
