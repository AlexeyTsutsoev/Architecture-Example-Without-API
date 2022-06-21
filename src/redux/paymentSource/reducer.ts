import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPaymentSource } from './thunk';

export type Payment = {
  last4: string;
  brand: string;
  expiryMonth: string | null;
  expiryYear: string | null;
};

type PaymentSourceState = {
  isLoading: boolean;
  payments: null | Payment[];
};

const initialState: PaymentSourceState = {
  isLoading: false,
  payments: null,
};

const onLoadStart = (state: PaymentSourceState) => {
  state.isLoading = true;
};

const onLoadEnd = (state: PaymentSourceState) => {
  state.isLoading = false;
};

const paymentSource = createSlice({
  name: 'paymentSource',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: builder => {
    // get cards
    builder.addCase(getPaymentSource.pending, onLoadStart);

    builder.addCase(getPaymentSource.fulfilled, (state, action) => {
      state.payments = action.payload;
      onLoadEnd(state);
    });

    builder.addCase(getPaymentSource.rejected, onLoadEnd);
  },
});

export const { setLoading } = paymentSource.actions;

export default paymentSource.reducer;
