import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  registerUserType,
  loginUserType,
  userType,
} from '../../interfaces/User';

import {
  loginUserRequest,
  logoutUsetRequest,
  registerUserRequest,
} from '../../api/reservationDeskBackend/userApi';
import { toError } from '../../utils/error';

import { bindActionCreators } from 'redux';
import { useAppDispatch } from '../store';

export const registerUser = createAsyncThunk<userType, registerUserType>(
  'users/registerUserStatus',
  async (userData) => {
    try {
      const response: userType = await registerUserRequest(userData);
      return response;
    } catch (error) {
      throw toError(error);
    }
  }
);

export const loginUser = createAsyncThunk<userType, loginUserType>(
  'users/loginUserStatus',
  async (userData) => {
    try {
      const response: userType = await loginUserRequest(userData);

      return response;
    } catch (error) {
      throw toError(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'users/logoutUserStatus',
  async () => {
    try {
      await logoutUsetRequest();
    } catch (err) {
      throw toError(err);
    }
  }
);

const initialState: userType = {
  userId: '',
  firstName: '',
  lastName: '',
  email: '',
  profilePic: '',
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userType>) => {
      const { userId, firstName, lastName, email, profilePic, token } =
        action.payload;
      return {
        ...state,
        userId,
        firstName,
        lastName,
        email,
        profilePic,
        token,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      const { userId, email, token, firstName, lastName } = action.payload;

      return {
        ...state,
        userId,
        firstName,
        lastName,
        email,
        token,
      };
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      throw new Error(action.error.message);
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { userId, email, token, firstName, lastName, profilePic } =
        action.payload;
      return {
        ...state,
        userId,
        firstName,
        lastName,
        email,
        token,
        profilePic,
      };
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      throw new Error(action.error.message);
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      return {
        ...state,
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        profilePic: '',
        token: '',
      };
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      throw new Error(action.error.message);
    });
  },
});

export const userActions = userSlice.actions;

export const useUserActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(userActions, dispatch);
};

export default userSlice.reducer;
