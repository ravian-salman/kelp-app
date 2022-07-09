import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './reducer';
import buySliceKelp from './reducer/buyKelp';

export const store = configureStore({
  reducer: {
    UI: uiSlice.reducer,
    BUYKELPSLICE: buySliceKelp.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
