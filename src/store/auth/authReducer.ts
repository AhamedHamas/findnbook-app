import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthState} from './authReducer.types';

const initialState: AuthState = {
  token: '',
  isAuthorized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLogin: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthorized = true;
    },
    onLogout: state => {
      state.token = null;
      state.isAuthorized = false;
    },
  },
});

export const {onLogin, onLogout} = authSlice.actions;
export default authSlice.reducer;
