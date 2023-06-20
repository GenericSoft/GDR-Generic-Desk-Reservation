import { combineReducers } from 'redux';

import { Room } from '../../interfaces/ImageMap';
import { userType } from '../../interfaces/User';

import userReducer from './userReducer';
import roomReducer from './imageMapReducer';

export type RootReducerType = {
  user: userType;
  room: Room;
};

const rootReducer = combineReducers<RootReducerType>({
  user: userReducer,
  room: roomReducer,
});
export default rootReducer;
