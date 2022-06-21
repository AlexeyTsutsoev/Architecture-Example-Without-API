import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductResponse, ResellerProdustType } from '../../API/responsesTypes';
import { AppDispatch, RootState } from '../store';
import { NormalizedTaxons } from './reducer';
import normalize from '../../utils/normalize';
import {
  addNewProductToResellerItemsFromApi,
  deleteProductFromResellerFromApi,
  getDepartmentsFromAPI,
  getProductsByCategoryId,
  getProductsFromAPI,
  ProductsParams,
} from '../../API/taxons';
import MerchantStorageService from '../../utils/AsyncStorageService/MerchantStorageService';
import {
  addResellerProduct,
  CamelCasedResellerProdustType,
  remoeRessellerProduct,
} from '../resellerProducts/reducer';
import { toCamelCase } from '../../utils/toCamelCase';

export type RessellerAddInfo = {
  id: string;
  value: boolean;
  resellerId?: string;
};

const parseItem = (item: ResellerProdustType) => {
  const result: any = {};
  for (let key in item) {
    let camelCassedKey = toCamelCase(key);
    result[camelCassedKey] = (item as any)[key];
  }
  return result as CamelCasedResellerProdustType;
};

export const loadProducts = createAsyncThunk<
  ProductResponse,
  void,
  { state: RootState; dispatch: AppDispatch }
>('products/getProductsFromAPI', async (_, { getState, rejectWithValue }) => {
  try {
    const merchantId = await MerchantStorageService.getCurrentMerchantId();
    const resellerMerchant = getState().main.user?.merchats?.find(
      merch => merch.role_name === 'owner',
    )?.merchant_id;
    const currentPage = getState().products.pageInfo.currentPage;
    const { q, price, created_at } = getState().products.filters;
    const currentCategory = getState().products.currentCategoryId;
    const rowConfig: ProductsParams = {
      params: {
        page: currentPage,
        q: q,
        price: price,
        created_at: created_at,
      },
      headers: {
        XKhoynMerchantId: merchantId ?? '',
        XKhoynResellerId: resellerMerchant ?? '',
      },
    };

    const { data } = currentCategory
      ? await getProductsByCategoryId(rowConfig, currentCategory)
      : await getProductsFromAPI(rowConfig);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export const loadCategories = createAsyncThunk<
  NormalizedTaxons,
  void,
  { state: RootState; dispatch: AppDispatch }
>('products/getDepartmentsFromAPI', async (_, { rejectWithValue }) => {
  try {
    const { data } = await getDepartmentsFromAPI();

    const norm = normalize(data.items);

    const result = {
      rootIds: data.items.map(root => root.id),
      allCategories: norm,
    };

    return result;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export const addToMyStore = createAsyncThunk<
  RessellerAddInfo,
  string,
  { state: RootState; dispatch: AppDispatch }
>(
  'products/addNewProductToResellerItemsFromApi',
  async (arg, { getState, dispatch }) => {
    try {
      const merchantId = await MerchantStorageService.getCurrentMerchantId();
      const resellerMerchant = getState().main.user?.merchats?.find(
        merch => merch.role_name === 'owner',
      )?.merchant_id;

      const { data, status } = await addNewProductToResellerItemsFromApi(arg, {
        XKhoynMerchantId: merchantId ?? '',
        XKhoynResellerId: resellerMerchant ?? '',
      });
      if (status === 201 || data) {
        const parsedData = parseItem(data);
        dispatch(addResellerProduct(parsedData));
        return { id: arg, value: true, resellerId: data.id };
      }
      return { id: arg, value: false };
    } catch (err: any) {
      console.log(
        'ERROR_FROM_DISPATCH_REMOVE_FROM_RESELLER_PRODUCT',
        err.response.data,
      );
      throw new Error(err.response.data.errors[0]);
    }
  },
);

export const deleteFromMyStore = createAsyncThunk<
  RessellerAddInfo,
  string,
  { state: RootState; dispatch: AppDispatch }
>(
  'products/deleteProductFromResellerFromApi',
  async (arg, { getState, dispatch }) => {
    try {
      const merchantId = await MerchantStorageService.getCurrentMerchantId();
      const resellerMerchant = getState().main.user?.merchats?.find(
        merch => merch.role_name === 'owner',
      )?.merchant_id;

      const { status } = await deleteProductFromResellerFromApi(arg, {
        XKhoynMerchantId: merchantId ?? '',
        XKhoynResellerId: resellerMerchant ?? '',
      });

      if (status === 204) {
        dispatch(remoeRessellerProduct(arg));
        return { id: arg, value: false };
      }
      return { id: arg, value: true };
    } catch (err: any) {
      console.log(
        'ERROR_FROM_DISPATCH_REMOVE_FROM_RESELLER_PRODUCT',
        err.response.data,
      );
      throw new Error(err.response.data.errors[0]);
    }
  },
);
