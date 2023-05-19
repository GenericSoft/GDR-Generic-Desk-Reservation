import {
  bindActionCreators,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { Room } from '../../interfaces/Room';
import { useAppDispatch } from '../store';

const initialState: Room = {
  imageSetup: '',
};

export const roomSetupSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<string>) => {
      const roomInfoJSON = action.payload;

      return {
        ...state,
        imageSetup: roomInfoJSON,
      };
    },
  },
});

const roomActions = roomSetupSlice.actions;

export const useRoomActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(roomActions, dispatch);
};

export default roomSetupSlice.reducer;
