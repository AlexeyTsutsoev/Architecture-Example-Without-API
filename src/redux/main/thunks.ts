import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  MerchantTypeFromServer,
  UpdateBankAccountInfo,
  UpdateMirrorInfo,
  UserResponse,
} from '../../API/responsesTypes';
import {
  loginRequest,
  checkUser,
  signUpRequest,
  startRecoveries,
  UpdateUserInfoParams,
  updateInfo,
  UpdatePasswordParams,
  requestUpdatePass,
  patchUserInfo,
  getMerchantByIdFromApi,
  patchDepositAccountFromApi,
  patchMerchantFromApi,
  patchAccount,
} from '../../API/user';
import AuthStorageService from '../../utils/AsyncStorageService/AuthStorageService';
import MerchantStorageService from '../../utils/AsyncStorageService/MerchantStorageService';
import { AppDispatch, RootState } from '../store';

type Auth = {
  username: string;
  password: string;
};

type RestorePassResponse = {
  email: string;
  id: string;
};

type SignUpServerResponse = {
  id: string;
  phone_number?: string;
  email: string;
  first_name?: string;
  last_name?: string;
  filter_profile: {
    gender: string;
  };
  onboarding?: {};
  mobile_app_auth_token: string;
  phone_number_verified: boolean;
  slug: null;
  facebook_url: string | null;
  instagram_url: string | null;
  bio: string | null;
  khoyn_support_phone_number: string;
  khoyn_onboarding_collection_id: string;
  profile_pic: null;
  mirror_url: string;
};

type MirrorInfo = {
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  bio?: string | null;
  mirror?: string;
};

type SettingsUpdate = {
  name: string;
  shippingFee: string;
};

export type LoginType = {
  user: UserResponse;
  merchant: MerchantTypeFromServer | null;
  currentMerchantId: string;
};

export const login = createAsyncThunk<
  LoginType | null,
  Auth,
  { state: RootState; dispatch: AppDispatch }
>('main/login', async args => {
  try {
    await AuthStorageService.setAuthInStorage(args.username, args.password);

    // user
    const { data } = await loginRequest(args.username, args.password);

    // merchants
    const merchats = data.permissions.merchant_accounts.filter(
      item => item.role_name !== 'owner',
    );
    const ownMerchantsId = data.permissions.merchant_accounts.find(
      item => item.role_name === 'owner',
    )?.merchant_id;

    let merchFromServer = null;
    if (ownMerchantsId) {
      merchFromServer = await getMerchantByIdFromApi(ownMerchantsId);
    }

    const currentMerchantId = merchats[0]?.merchant_id;
    MerchantStorageService.setCurrentMerchantId(currentMerchantId);
    return {
      user: data,
      merchant: merchFromServer?.data ?? null,
      currentMerchantId,
    };
  } catch (error: any) {
    console.log('THUNK_AUTH_ERR', error);
    AuthStorageService.removeAuth();
    return null;
  }
});

export const authorize = createAsyncThunk<
  LoginType | null,
  undefined,
  { state: RootState; dispatch: AppDispatch }
>('main/authorizeUser', async () => {
  try {
    const token = await AuthStorageService.getAuthFromStorage();
    const { data } = await checkUser();

    const merchantId = await MerchantStorageService.getCurrentMerchantId();

    if (data && token) {
      const merchats = data.permissions.merchant_accounts.filter(
        item => item.role_name !== 'owner',
      );

      const ownMerchantsId = data.permissions.merchant_accounts.find(
        item => item.role_name === 'owner',
      )?.merchant_id;

      let merchFromServer = null;
      if (ownMerchantsId) {
        merchFromServer = await getMerchantByIdFromApi(ownMerchantsId);
      }

      return {
        user: data,
        merchant: merchFromServer?.data ?? null,
        currentMerchantId: merchantId ?? merchats[0].merchant_id,
      };
    }
    return null;
  } catch (err: any) {
    console.log('THUNK_CHECK_ERR', err);
    AuthStorageService.removeAuth();
    MerchantStorageService.removeMerchant();
    return null;
  }
});

export const startSignUp = createAsyncThunk<
  SignUpServerResponse,
  Auth,
  { state: RootState; dispatch: AppDispatch }
>('main/signUp', async (args, { rejectWithValue }) => {
  try {
    const { data } = await signUpRequest(args.username, args.password);
    await AuthStorageService.setAuthInStorage(args.username, args.password);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export const buildProfile = createAsyncThunk<
  UserResponse,
  void,
  { state: RootState; dispatch: AppDispatch }
>('main/patchAccount', async (_, { rejectWithValue, getState }) => {
  try {
    const userId = getState().main.user?.id;
    const buildInfo = getState().profileInfo;
    if (!userId) {
      throw new Error('Error with user');
    }
    const { data } = await patchAccount(buildInfo, userId);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export const requestForSendCode = createAsyncThunk<
  RestorePassResponse,
  string,
  { state: RootState; dispatch: AppDispatch }
>('main/restorePass', async (email, { rejectWithValue }) => {
  try {
    const { data } = await startRecoveries(email);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export const updateUserInfo = createAsyncThunk<
  UserResponse,
  UpdateUserInfoParams,
  { state: RootState; dispatch: AppDispatch }
>('main/updateUserInfo', async (info, { rejectWithValue, getState }) => {
  try {
    const id = getState().main.user!.id;
    const { data } = await updateInfo(id, info);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export const updatePassword = createAsyncThunk<
  UserResponse,
  UpdatePasswordParams,
  { state: RootState; dispatch: AppDispatch }
>('main/updatePass', async (info, { getState, rejectWithValue }) => {
  try {
    const id = getState().main.user!.id;
    const { data, status } = await requestUpdatePass(id, info);

    if (status === 500) {
      throw new Error('Error from Server');
    }

    if (status === 200) {
      AuthStorageService.setPasswordInStorage(info.password);
    }

    return data;
  } catch (err: any) {
    return rejectWithValue(err);
  }
});

export const updateMirror = createAsyncThunk<
  MirrorInfo | null,
  UpdateMirrorInfo,
  { state: RootState; dispatch: AppDispatch }
>('main/patchUserInfo', async (info, { getState }) => {
  const { user } = getState().main;
  try {
    const { data } = await patchUserInfo(info, user!.id);
    return {
      bio: data.bio ?? user!.bio,
      instagramUrl: data.instagram_url ?? user!.instagramUrl,
      facebookUrl: data.facebook_url ?? user!.facebookUrl,
      mirror: data.mirror_url ?? user!.mirrorLink,
      name: data.name,
      shippingFee: data.shipping_fee,
    };
  } catch (err: any) {
    console.log('ERR_FROM_THUNK_', err.response.data);
    return null;
  }
});

export const updateStoreSettings = createAsyncThunk<
  SettingsUpdate | null,
  UpdateMirrorInfo,
  { state: RootState; dispatch: AppDispatch }
>('main/patchMerchantFromApi', async (info, { getState }) => {
  const { ownMerchant } = getState().main;
  try {
    const { data } = await patchMerchantFromApi(ownMerchant!.id, info);
    return {
      name: data.name,
      shippingFee: data.shipping_fee,
    };
  } catch (err: any) {
    console.log('ERR_FROM_THUNK_', err.response.data);
    return null;
  }
});

export const addOwnMerchant = createAsyncThunk<
  MerchantTypeFromServer | null,
  void,
  { state: RootState; dispatch: AppDispatch }
>('main/getMerchantByIdFromApi', async (_, { getState }) => {
  try {
    const id = getState().main.user?.merchats?.find(
      merch => merch.role_name === 'owner',
    )?.merchant_id;
    if (!id) {
      return null;
    }
    const { data } = await getMerchantByIdFromApi(id);
    return data;
  } catch (err: any) {
    console.log('ERR_FROM_addOwnMerchant_THUNK', err);
    return null;
  }
});

export const patchDepositAccount = createAsyncThunk<
  MerchantTypeFromServer | null,
  UpdateBankAccountInfo,
  { state: RootState; dispatch: AppDispatch }
>('main/patchDepositAccountFromAPi', async (args, { getState }) => {
  try {
    const id = getState().main.ownMerchant?.id;
    if (!id) {
      throw new Error('Finded no one merchant');
    }
    const { data } = await patchDepositAccountFromApi(id, args);
    return data;
  } catch (err: any) {
    console.log('ERR_FROM_PATCH_ACCOUNT_THUNK', err);
    return null;
  }
});
