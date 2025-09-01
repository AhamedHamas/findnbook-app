import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BusinessState} from './businessReducer.types';

const businessInitialState: BusinessState = {
  id: '',
  name: '',
  address: '',
  description: '',
  openingTime: '',
  closingTime: '',
  workingDays: [],
  ownerName: '',
  ownerEmail: '',
  services: [],
  category: '',
};

const businessSlice = createSlice({
  name: 'business',
  initialState: businessInitialState,
  reducers: {
    setBusiness: (state, action: PayloadAction<BusinessState>) => {
      return action.payload;
    },
    clearBusiness: () => {
      return businessInitialState;
    },
  },
});

export const {setBusiness, clearBusiness} = businessSlice.actions;
export default businessSlice.reducer;
