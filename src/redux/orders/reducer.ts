import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LineItem, OrdersAddress, Payment } from '../../API/responsesTypes';
import { addNewOrder, deleteOrder, loadOrders, patchNewOrder } from './thunk';

export type Variant = {
  id?: string;
  name?: string;
  sku?: string;
  options?: string;
  image?: Image | null;
  product_id?: string;
  shortDescription: null | string;
};

export type Image = {
  smallUrl?: string;
  productUrl?: string;
  largeUrl?: string;
  messengerUrl?: string;
};

export type OrdersItemType = {
  id: string;
  createdAt: string;
  number: string;
  state?: string;
  completedAt: string | null;
  paymentState: string | null;
  shipmentState: string | null;
  displayItemTotal: string;
  displayTotal: string;
  displayShipTotal: string;
  taxTotal: string;
  lineItems: LineItem[];
  merchantName: string;
  payments: Payment[];
  shipAddress: OrdersAddress | null;
  orderUrl: string;
};

export type OrdersState = {
  isLoading: boolean;
  orders: OrdersItemType[] | null;
};

const initialState: OrdersState = {
  isLoading: false,
  orders: null,
};

// helpers
const onLoadStart = (state: OrdersState) => {
  state.isLoading = true;
};

const onLoadEnd = (state: OrdersState) => {
  state.isLoading = false;
};

const setOrders = (
  state: OrdersState,
  {
    payload,
  }: PayloadAction<
    OrdersItemType[] | undefined,
    string,
    {
      arg: void | { id: string };
      requestId: string;
      requestStatus: 'fulfilled';
    },
    never
  >,
) => {
  if (payload) {
    state.orders = payload;
  } else {
    state.orders = initialState.orders;
  }
  state.isLoading = false;
};

const addOrder = (
  state: OrdersState,
  {
    payload,
  }: PayloadAction<
    OrdersItemType,
    string,
    {
      requestId: string;
      requestStatus: 'fulfilled';
    },
    never
  >,
) => {
  if (state.orders) {
    state.orders = state.orders.filter(
      order => order.number !== payload.number,
    );
    state.orders?.unshift(payload);
  } else {
    state.orders = [payload];
  }
  state.isLoading = false;
};

// slice
const orders = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setStateLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: builder => {
    // load orders
    builder.addCase(loadOrders.pending, onLoadStart);

    builder.addCase(loadOrders.fulfilled, setOrders);

    builder.addCase(loadOrders.rejected, onLoadEnd);

    // new order
    builder.addCase(addNewOrder.pending, onLoadStart);

    builder.addCase(addNewOrder.fulfilled, addOrder);

    builder.addCase(addNewOrder.rejected, onLoadEnd);

    // add product to order
    builder.addCase(patchNewOrder.pending, onLoadStart);

    builder.addCase(patchNewOrder.fulfilled, addOrder);

    builder.addCase(patchNewOrder.rejected, onLoadEnd);

    // delete order
    builder.addCase(deleteOrder.pending, onLoadStart);

    builder.addCase(deleteOrder.fulfilled, (state, { payload }) => {
      if (payload && state.orders) {
        state.orders = state.orders.filter(order => order.id !== payload);
      }
      onLoadEnd(state);
    });
  },
});

export const { setStateLoading } = orders.actions;

export default orders.reducer;
