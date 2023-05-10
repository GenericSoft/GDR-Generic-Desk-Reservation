import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { apiUserType, userType } from '../../interfaces/User';

import { registerUserRequest } from '../../api/reservationDeskBackend/userApi';

export const registerUser = createAsyncThunk(
  'users/registerUserStatus',
  async (userData: apiUserType) => {
    const response = await registerUserRequest(userData);

    if (response.result) {
      return response.result;
    }

    return null;
  }
);

const initialState: userType = {
  userId: '',
  firstName: '',
  lastName: '',
  email: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userType>) => {
      const { userId, firstName, lastName, email } = action.payload;
      return {
        ...state,
        userId,
        firstName,
        lastName,
        email,
      };
    },
    logoutUser: (state) => ({
      ...state,
      userId: '',
      firstName: '',
      lastName: '',
      email: '',
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      const { userId, firstName, lastName, email } = action.payload;
      return {
        ...state,
        userId,
        firstName,
        lastName,
        email,
      };
    });
    builder.addCase(registerUser.rejected, () => {
      console.log('error');
    });
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
