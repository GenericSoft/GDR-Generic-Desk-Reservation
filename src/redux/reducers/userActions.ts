import { bindActionCreators } from 'redux';
import { useAppDispatch } from '../store';

import { userActions } from './userReducer';

export const useUserActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(userActions, dispatch);
};
