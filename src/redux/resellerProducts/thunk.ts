import { createAsyncThunk } from '@reduxjs/toolkit';
import { ResellerProdustType } from '../../API/responsesTypes';
import {
  editPriceRequest,
  getResellerProductFromApi,
  ProductsParams,
} from '../../API/taxons';
import MerchantStorageService from '../../utils/AsyncStorageService/MerchantStorageService';
import { toCamelCase } from '../../utils/toCamelCase';
import { PageInfo } from '../collections/reducer';
import { AppDispatch, RootState } from '../store';
import { CamelCasedResellerProdustType } from './reducer';

type ProcessedProduct = {
  items: CamelCasedResellerProdustType[];
  meta: PageInfo;
};

type UpdatePriceParams = {
  id: string;
  markup: number;
};

type ReturnedValue = ProcessedProduct | undefined;

const parseItem = (item: ResellerProdustType) => {
  const result: any = {};
  for (let key in item) {
    let camelCassedKey = toCamelCase(key);
    result[camelCassedKey] = (item as any)[key];
  }
  return result as CamelCasedResellerProdustType;
};

export const loadResellerProducts = createAsyncThunk<
  ReturnedValue,
  void,
  { state: RootState; dispatch: AppDispatch }
>(
  'resellerProducts/getResellerProductFromApi',
  async (_, { rejectWithValue, getState }) => {
    try {
      const merchantId = await MerchantStorageService.getCurrentMerchantId();
      const resellerMerchant = getState().main.user?.merchats?.find(
        merch => merch.role_name === 'owner',
      )?.merchant_id;
      const filters = getState().resellerProduct.filters;
      const rowConfig: ProductsParams = {
        params: filters,
        headers: {
          XKhoynMerchantId: merchantId ?? '',
          XKhoynResellerId: resellerMerchant ?? '',
        },
      };
      const { data } = await getResellerProductFromApi(rowConfig);
      const camelCasedData = data.items.map(parseItem);
      return {
        items: camelCasedData,
        meta: data.meta,
      };
    } catch (err: any) {
      console.log('ERROR_IN_RESELLER_PRODUCTS_THUNK', err);
      rejectWithValue([] as CamelCasedResellerProdustType[]);
    }
  },
);

export const editPrice = createAsyncThunk<
  CamelCasedResellerProdustType,
  UpdatePriceParams,
  { state: RootState; dispatch: AppDispatch }
>('resellerProducts/editPriceRequest', async ({ id, markup }, { getState }) => {
  try {
    const merchantIdFromStore =
      await MerchantStorageService.getCurrentMerchantId();
    const merchIdFromStore = getState().main.user?.merchats?.find(
      merch => merch.merchant_id === 'agent',
    )?.merchant_id;
    const merchantId = merchantIdFromStore ?? merchIdFromStore ?? '';

    const { data } = await editPriceRequest(id, merchantId, markup);
    const camelCasedData = parseItem(data);

    return camelCasedData;
  } catch (err: any) {
    console.log('ERROR_IN_RESELLER_PRODUCTS_THUNK', err);
    throw new Error(err.response.data.errors[0]);
  }
});
