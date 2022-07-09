import { createSlice } from '@reduxjs/toolkit';

type SliceState = {
  loading: boolean;
  bnbBalance: string | number;
  kelpBalance: string | number;
  amountRaised: string | number;
  kelpValue: string | number;
  bnbValue: string | number;
  userBalance: string | number;
};

const initialState: SliceState = {
  loading: false,
  bnbBalance: 0,
  kelpBalance: 0,
  amountRaised: 0,
  kelpValue: 0,
  bnbValue: 0,
  userBalance: 0,
};

const uiSlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    SetBnbBalnce(state, action) {
      state.bnbBalance = action.payload;
    },
    SetKelpBalnce(state, action) {
      state.kelpBalance = action.payload;
    },
    SetAmountRaised(state, action) {
      state.amountRaised = action.payload;
    },
    SetKelpValue(state, action) {
      state.kelpValue = action.payload;
    },
    SetBnbValue(state, action) {
      state.bnbValue = action.payload;
    },
    SetUserBalance(state, action) {
      state.userBalance = action.payload;
    },
    setInitial(state) {
      state.loading = false;
      state.bnbBalance = 0;
      state.kelpBalance = 0;
      state.amountRaised = 0;
      state.kelpValue = 0;
      state.bnbValue = 0;
      state.userBalance = 0;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
