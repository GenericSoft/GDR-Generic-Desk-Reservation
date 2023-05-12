import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { apiUserType, userType } from '../../interfaces/User';

import {
  // createUserRequest,
  registerUserRequest,
} from '../../api/reservationDeskBackend/userApi';

export const registerUser = createAsyncThunk(
  'users/registerUserStatus',
  async (userData: apiUserType) => {
    try {
      const response = await registerUserRequest(userData);
      return response;
    } catch (error: any) {
      throw Error(error.message);
    }
  }
);

// export const saveUserToDb = createAsyncThunk(
//   'users/saveUserToDbStatus',
//   async (userData: {
//     userId: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//   }) => {
//     try {
//       await createUserRequest(userData);
//     } catch (error: any) {
//       throw Error(error.message);
//     }
//   }
// );

const initialState: userType = {
  userId: '',
  firstName: '',
  lastName: '',
  email: '',
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userType>) => {
      const { userId, firstName, lastName, email, token } = action.payload;
      return {
        ...state,
        userId,
        firstName,
        lastName,
        email,
        token,
      };
    },
    logoutUser: (state) => ({
      ...state,
      userId: '',
      firstName: '',
      lastName: '',
      email: '',
      token: '',
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action: any) => {
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
      throw Error(action.error.message);
    });
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
