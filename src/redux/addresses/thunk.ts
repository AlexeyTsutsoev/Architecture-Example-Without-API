import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  archiveAddressById,
  createNewAddressFromApi,
  deleteAddressById,
  getAddressesFromApi,
  getProvincesFromApi,
  makeAddressDefaultById,
  unarchiveAddressById,
  updateAddressFromApi,
} from '../../API/addresses';
import {
  Address,
  AddressesResponse,
  PostAddress,
  ProvincesFromServer,
} from '../../API/responsesTypes';
import { toCamelCase } from '../../utils/toCamelCase';
import { AppDispatch, RootState } from '../store';
import { AddressesType } from './reducer';

type ReturnedValue = AddressesType[] | undefined;

type AddressId = {
  id: string;
};

type UpdateArgs = {
  id: string;
  payload: PostAddress;
};

//helpers

const parseItem = (item: Address): AddressesType => {
  const result: any = {};
  for (let key in item) {
    let camelCassedKey = toCamelCase(key);
    result[camelCassedKey] = (item as any)[key];
  }
  return result;
};

const parseData = (data: AddressesResponse): ReturnedValue => {
  const { items } = data;
  return items?.map(parseItem);
};

export const loadAddresses = createAsyncThunk<
  ReturnedValue,
  void,
  { state: RootState; dispatch: AppDispatch }
>('addresses/getAddressesFromApi', async (_, { rejectWithValue }) => {
  try {
    const { data } = await getAddressesFromApi();
    return parseData(data);
  } catch (err: any) {
    rejectWithValue(err.response.data);
  }
});

export const deleteAddress = createAsyncThunk<
  ReturnedValue,
  AddressId,
  { state: RootState; dispatch: AppDispatch }
>(
  'addresses/deleteAddressById',
  async (args, { getState, rejectWithValue }) => {
    try {
      const { status } = await deleteAddressById(args.id);
      const addresses = getState().addresses.addresses;
      if (status === 204) {
        return addresses?.filter(address => address.id !== args.id);
      }
      // for ts solve
      return addresses ?? undefined;
    } catch (err: any) {
      rejectWithValue(err.response.data);
    }
  },
);

export const archiveAdress = createAsyncThunk<
  AddressesType | undefined,
  AddressId,
  { state: RootState; dispatch: AppDispatch }
>('addresses/archiveAddressesById', async (args, { rejectWithValue }) => {
  try {
    const { data, status } = await archiveAddressById(args.id);

    if (status === 200) {
      return parseItem(data);
    }
  } catch (err: any) {
    rejectWithValue(err.response.data);
  }
});

export const unarchiveAdress = createAsyncThunk<
  AddressesType | undefined,
  AddressId,
  { state: RootState; dispatch: AppDispatch }
>('addresses/unarchiveAddressesById', async (args, { rejectWithValue }) => {
  try {
    const { data, status } = await unarchiveAddressById(args.id);

    if (status === 200) {
      return parseItem(data);
    }
  } catch (err: any) {
    rejectWithValue(err.response.data);
  }
});

export const setDefaultAddress = createAsyncThunk<
  AddressesType | undefined,
  AddressId,
  { state: RootState; dispatch: AppDispatch }
>('addresses/makeDefaultById', async (args, { rejectWithValue }) => {
  try {
    const { data, status } = await makeAddressDefaultById(args.id);

    if (status === 200) {
      return parseItem(data);
    }
  } catch (err: any) {
    rejectWithValue(err.response.data);
  }
});

export const udateAddressRequest = createAsyncThunk<
  AddressesType | undefined,
  UpdateArgs,
  { state: RootState; dispatch: AppDispatch }
>('addresses/updateAddressFromApi', async (args, { rejectWithValue }) => {
  try {
    const { data, status } = await updateAddressFromApi(args.id, args.payload);

    if (status === 200) {
      return parseItem(data);
    }
  } catch (err: any) {
    rejectWithValue(err.response.data);
  }
});

export const createNewAddress = createAsyncThunk<
  AddressesType | undefined,
  PostAddress,
  { state: RootState; dispatch: AppDispatch }
>('addresses/createNewAddressFromApi', async (args, { rejectWithValue }) => {
  try {
    const { data, status } = await createNewAddressFromApi(args);

    if (status === 500) {
      throw new Error('Error from Server');
    }

    return parseItem(data);
  } catch (err: any) {
    rejectWithValue(err.response.data);
  }
});

export const getProvinces = createAsyncThunk<
  ProvincesFromServer[],
  void,
  { state: RootState; dispatch: AppDispatch }
>('addresses/getProvincesFromApi', async () => {
  try {
    const { data } = await getProvincesFromApi();
    return data;
  } catch (err: any) {
    console.log('ERR_FROM_CHUNK_', err);
    return [];
  }
});
