import { createSlice } from '@reduxjs/toolkit';

type SliceState = {
  loading: boolean;
  amount: string | number;
  temporaryAmount: string | number;
  isBnbAmount: string | number | boolean;
  selectedIndex: string | number | null;
  originalBnbBalance: string | number | null;
  originalDollarBalance: string | number | null;
  gasFee: string | number | null;
  address: string | null;
  bnbPrice: number | null;
};

const initialState: SliceState = {
  loading: false,
  amount: 0,
  temporaryAmount: '0.00',
  isBnbAmount: false,
  selectedIndex: null,
  originalBnbBalance: 0,
  originalDollarBalance: 0,
  gasFee: 0,
  address: '',
  bnbPrice: 0.01,
};
const currentMarketPriceofBNB = '221.46972628107';
const buySliceKelp = createSlice({
  name: 'BUYKELP',
  initialState,
  reducers: {
    SetAmount(state, action) {
      state.amount = action.payload;
    },
    SetTemporaryAmount(state, action) {
      state.temporaryAmount = action.payload;
      if (state.isBnbAmount)
        state.originalDollarBalance =
          Number(state.temporaryAmount) * Number(currentMarketPriceofBNB);
    },
    SetIsBnbAmount(state, action) {
      state.isBnbAmount = action.payload;
    },
    SetBNBPrice(state, action) {
      state.bnbPrice = Number(action.payload[1]) / Number(action.payload[0]);
    },
    SetAddress(state, action) {
      state.address = action.payload;
    },
    SetSelectedIndex(state, action) {
      state.selectedIndex = action.payload;
    },
    SetOriginalBnbBalance(state, action) {
      state.originalBnbBalance = action.payload;
    },
    SetOriginalDollarBalance(state, action) {
      state.originalDollarBalance = action.payload;
    },
    SetGasFee(state, action) {
      state.gasFee = action.payload;
    },
    setInitial(state) {
      state.loading = false;
      state.amount = 0;
      state.temporaryAmount = '0.00';
      state.isBnbAmount = false;
      state.selectedIndex = null;
      state.originalBnbBalance = 0;
      state.originalDollarBalance = 0;
      state.bnbPrice = 0.01;
    },
  },
});

export const buyKelpActions = buySliceKelp.actions;

export default buySliceKelp;
