import { createAsyncThunk } from '@reduxjs/toolkit';
import { Platform } from 'react-native';
import {
  createNewOrderFromApi,
  deleteOrderFromApi,
  getOrdersFromApi,
  OrderConfigType,
  patchOrderFromAPI,
} from '../../API/orders';
import { Orders, OrdersResponse } from '../../API/responsesTypes';
import MerchantStorageService from '../../utils/AsyncStorageService/MerchantStorageService';
import { toCamelCase } from '../../utils/toCamelCase';
import { AppDispatch, RootState } from '../store';
import { OrdersItemType } from './reducer';

type ReturnedValue = OrdersItemType[] | undefined;

type PatchArgs = {
  orderId: string;
  variantId: string;
};

const parseItem = (item: Orders | OrdersResponse) => {
  const result: any = {};
  for (let key in item) {
    let camelCassedKey = toCamelCase(key);
    result[camelCassedKey] = (item as any)[key];
  }
  return result;
};

const parseData = (data: OrdersResponse): ReturnedValue => {
  const { items } = data;
  return items?.map(parseItem);
};

export const loadOrders = createAsyncThunk<
  ReturnedValue,
  void,
  { state: RootState; dispatch: AppDispatch }
>('orders/getOrdersFromApi', async (_, { rejectWithValue, getState }) => {
  try {
    const merchantId = await MerchantStorageService.getCurrentMerchantId();

    const ownMerchFromList = getState().main.user?.merchats?.find(
      merch => merch.role_name === 'owner',
    )?.merchant_id;
    const ownMerchFromStore = getState().main.ownMerchant?.id;

    const { data } = await getOrdersFromApi(
      merchantId!,
      ownMerchFromStore ?? ownMerchFromList,
    );
    return parseData(data);
  } catch (err: any) {
    rejectWithValue(err.response.data);
  }
});

export const addNewOrder = createAsyncThunk<
  OrdersItemType,
  string,
  { state: RootState; dispatch: AppDispatch }
>(
  'orders/createNewOrderFromApi',
  async (variantId, { rejectWithValue, getState }) => {
    try {
      const merchantId = await MerchantStorageService.getCurrentMerchantId();
      const resellerId = getState().main.user?.merchats?.find(
        merch => merch.role_name === 'owner',
      )?.merchant_id;
      const channel =
        Platform.OS === 'ios' ? 'keyboard-ios' : 'keyboard-android';
      const orderConfig: OrderConfigType = {
        user_id: getState().main.user?.id!,
        merchantId: merchantId ?? '',
        resellerId,
        channel,
        line_items: [{ variant_id: variantId, quantity: 1 }],
      };
      const { data } = await createNewOrderFromApi(orderConfig);
      return parseItem(data);
    } catch (err: any) {
      rejectWithValue(err.response.data);
    }
  },
);

export const patchNewOrder = createAsyncThunk<
  OrdersItemType,
  PatchArgs,
  { state: RootState; dispatch: AppDispatch }
>(
  'orders/patchOrderFromAPI',
  async ({ orderId, variantId }, { rejectWithValue, getState }) => {
    try {
      const merchantId = await MerchantStorageService.getCurrentMerchantId();
      const resellerId = getState().main.user?.merchats?.find(
        merch => merch.role_name === 'owner',
      )?.merchant_id;
      const userId = getState().main.user?.id;

      const channel =
        Platform.OS === 'ios' ? 'keyboard-ios' : 'keyboard-android';

      const orderConfig: OrderConfigType = {
        user_id: userId ?? '',
        merchantId: merchantId ?? '',
        resellerId,
        channel,
        line_items: [{ variant_id: variantId, quantity: 1 }],
      };
      const { data } = await patchOrderFromAPI(orderId, orderConfig);
      return parseItem(data);
    } catch (err: any) {
      rejectWithValue(err.response.data);
    }
  },
);

export const deleteOrder = createAsyncThunk<
  string | null,
  string,
  { state: RootState; dispatch: AppDispatch }
>('orders/deleteOrderFromApi', async (arg, { rejectWithValue, getState }) => {
  try {
    const merchantId = await MerchantStorageService.getCurrentMerchantId();
    const resellerId = getState().main.user?.merchats?.find(
      merch => merch.role_name === 'owner',
    )?.merchant_id;
    const { status } = await deleteOrderFromApi(arg, merchantId!, resellerId);

    if (status === 204) {
      return arg;
    }
    return null;
  } catch (err: any) {
    rejectWithValue(err.response.data);
    return null;
  }
});
