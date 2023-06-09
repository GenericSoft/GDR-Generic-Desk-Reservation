import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { bindActionCreators } from 'redux';

import {
  registerUserType,
  loginUserType,
  userType,
  EditUserDataType,
  ProfileInfoType,
} from '../../interfaces/User';

import {
  editUserRequest,
  loginUserRequest,
  logoutUserRequest,
  registerUserRequest,
} from '../../api/reservationDeskBackend/userApi';
import { toError } from '../../utils/error';

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

export const editUser = createAsyncThunk<ProfileInfoType, EditUserDataType>(
  'users/editUserStatus',
  async (userData) => {
    try {
      const response: ProfileInfoType = await editUserRequest(userData);
      return response;
    } catch (err) {
      throw toError(err, true);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'users/logoutUserStatus',
  async () => {
    try {
      await logoutUserRequest();
    } catch (err) {
      throw toError(err);
    }
  }
);

const initialState: userType = {
  userId: '',
  firstName: '',
  lastName: '',
  jobRole: '',
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
    builder.addCase(editUser.fulfilled, (state, action) => {
      const { firstName, lastName, jobRole, country, birthday, profilePic } =
        action.payload;

      return {
        ...state,
        firstName,
        lastName,
        jobRole,
        country,
        birthday,
        profilePic,
      };
    });
    builder.addCase(editUser.rejected, (state, action) => {
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
