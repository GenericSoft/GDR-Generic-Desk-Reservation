import { combineReducers } from 'redux';

import { userType } from '../../interfaces/User';

import userReducer from './userReducer';

export type RootReducerType = {
  user: userType;
};

const rootReducer = combineReducers<RootReducerType>({
  user: userReducer,
});
export type RootStateType = ReturnType<typeof rootReducer>;
export default rootReducer;
