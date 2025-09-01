import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserState} from './userReducer.types';

const userInitialState: UserState = {
  id: '',
  name: '',
  email: '',
  phoneNumber: '',
  role: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    clearUser: () => {
      return userInitialState;
    },
  },
});

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;
