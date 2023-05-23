import {
  bindActionCreators,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { Room } from '../../interfaces/ImageMap';
import { useAppDispatch } from '../store';
import { toError } from '../../utils/error';
import { saveImageToFirebaseRequest } from '../../api/reservationDeskBackend/imageMapApi';

const initialState: Room = {
  imageMapId: '',
  imageMapJSON: '',
  reservedDesks: [],
};

export const saveImageMapToFirebase = createAsyncThunk<
  string | undefined,
  string
>('imageMapPro/saveJSONStatus', async (imageMapJSON) => {
  try {
    const imageMap = await saveImageToFirebaseRequest(imageMapJSON);
    console.log('REDUCER THUNK imageMap', imageMap);

    return imageMap;
  } catch (error) {
    throw toError(error);
  }
});

export const roomSetupSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<Room>) => {
      const { imageMapJSON, reservedDesks } = action.payload;

      console.log('action.payload');

      return {
        ...state,
        imageMapJSON,
        reservedDesks,
      };
    },
    setRoomId: (state, action: PayloadAction<string>) => {
      const imageMapId = action.payload;

      return {
        ...state,
        imageMapId,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveImageMapToFirebase.fulfilled, (state, action) => {
      const imageMapJSON = action.payload;

      console.log('REDUX', imageMapJSON);

      return {
        ...state,
        // when it needs to be used, it should be parsed to an object and you should take the first element like this JSON.parse(imageMapJSON)[0], it because of the plugin we are using
        imageMapJSON,
      };
    });
    builder.addCase(saveImageMapToFirebase.rejected, (state, action) => {
      throw new Error(action.error.message);
    });
  },
});

const roomActions = roomSetupSlice.actions;

export const useRoomActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(roomActions, dispatch);
};

export default roomSetupSlice.reducer;
