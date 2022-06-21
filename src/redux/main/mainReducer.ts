import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/types/types-external';
import { MerchantTypeFromServer, UserResponse } from '../../API/responsesTypes';
import MerchantStorageService from '../../utils/AsyncStorageService/MerchantStorageService';
import {
  requestForSendCode,
  updateUserInfo,
  updatePassword,
  updateMirror,
  updateStoreSettings,
  startSignUp,
  login,
  authorize,
  LoginType,
  buildProfile,
} from './thunks';

export type Merchant = {
  role_name: string;
  merchant_id: string;
  merchant_name: string;
  mirror_url: string;
  theme_settings: { mirror_colour: string };
};

export type User = {
  id: string;
  email: string;
  phoneNumer?: string;
  firstName?: string;
  lastName?: string;
  securityPin?: number;
  phoneNumerVerify?: boolean;
  khoynSupportPhoneNumber: string;
  khoynOnboardingCollectionId: string;
  onboarding?: {
    addressCreated: boolean;
  };
  merchats?: Merchant[];
  currentMerchant?: string;
  bio?: string;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  mirrorLink: string;
  picture?: string;
};

type RestoreCred = {
  id?: string;
  email?: string;
  code?: string;
};

type UserState = {
  isLoading: boolean;
  isAuth: boolean;
  user: User | null;
  restoreCred: RestoreCred | null;
  ownMerchant: MerchantTypeFromServer | null;
};

const initialState: UserState = {
  isLoading: false,
  isAuth: false,
  user: null,
  restoreCred: null,
  ownMerchant: null,
};

// helpers
const setUserHelper = (
  state: WritableDraft<UserState>,
  payload: UserResponse,
) => {
  state.user = {
    id: payload.id,
    email: payload.email,
    phoneNumer: payload.phone_number,
    firstName: payload.first_name,
    lastName: payload.last_name,
    securityPin: payload.security_pin,
    phoneNumerVerify: payload.phone_number_verified,
    khoynSupportPhoneNumber: payload.khoyn_support_phone_number,
    khoynOnboardingCollectionId: payload.khoyn_onboarding_collection_id,
    onboarding: {
      addressCreated: payload.address_created,
    },
    bio: payload.bio,
    instagramUrl: payload.instagram_url,
    facebookUrl: payload.facebook_url,
    mirrorLink: payload.mirror_url,
    picture: payload.profile_pic.original_url,
  };
  if (payload.permissions) {
    state.user.merchats = payload.permissions.merchant_accounts;
  }
};

const onLoadStart = (state: UserState) => {
  state.isLoading = true;
};

const onLoadEnd = (state: UserState) => {
  state.isLoading = false;
};

const reloadState = (state: UserState) => {
  state.isAuth = initialState.isAuth;
  state.isLoading = initialState.isLoading;
  state.user = initialState.user;
};

const authUser = (state: UserState, payload: LoginType | null) => {
  if (payload) {
    setUserHelper(state, payload.user);
    if (state.user) {
      state.user.currentMerchant = payload.currentMerchantId;
    }
    state.ownMerchant = payload.merchant;
    state.isAuth = true;
  }
  onLoadEnd(state);
};

const main = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserResponse>) => {
      setUserHelper(state, action.payload);
      state.isAuth = true;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addCode: (state, action: PayloadAction<string>) => {
      state.restoreCred = {
        ...state.restoreCred,
        code: action.payload,
      };
    },
    setCurrentMerchat: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.currentMerchant = action.payload;
      }
      MerchantStorageService.setCurrentMerchantId(action.payload);
    },
    setColor: (state, action: PayloadAction<string>) => {
      if (state.user?.merchats) {
        const findedIndex = state.user.merchats.findIndex(
          merch => merch.role_name === 'owner',
        );
        state.user.merchats[findedIndex].theme_settings.mirror_colour =
          action.payload;
      }
    },
    setOwnMerchant: (state, action: PayloadAction<MerchantTypeFromServer>) => {
      state.ownMerchant = action.payload;
    },
    resetState: reloadState,
  },
  extraReducers: buider => {
    // login
    buider.addCase(login.pending, onLoadStart);

    buider.addCase(login.fulfilled, (state, { payload }) => {
      authUser(state, payload);
    });

    buider.addCase(login.rejected, reloadState);

    //auth
    buider.addCase(authorize.pending, onLoadStart);

    buider.addCase(authorize.fulfilled, (state, { payload }) => {
      authUser(state, payload);
    });

    buider.addCase(authorize.rejected, reloadState);

    // signUp
    buider.addCase(startSignUp.pending, state => {
      state.isLoading = true;
    });

    buider.addCase(startSignUp.fulfilled, (state, { payload }) => {
      state.user = {
        id: payload.id,
        email: payload.email,
        phoneNumer: payload.phone_number,
        firstName: payload.first_name,
        lastName: payload.last_name,
        phoneNumerVerify: payload.phone_number_verified,
        khoynSupportPhoneNumber: payload.khoyn_support_phone_number,
        khoynOnboardingCollectionId: payload.khoyn_onboarding_collection_id,
        facebookUrl: payload.facebook_url,
        instagramUrl: payload.instagram_url,
        mirrorLink: payload.mirror_url,
      };
      state.isLoading = false;
    });

    buider.addCase(startSignUp.rejected, state => {
      state.isLoading = false;
    });

    // build profile
    buider.addCase(buildProfile.pending, onLoadStart);

    buider.addCase(buildProfile.fulfilled, (state, { payload }) => {
      if (!payload) {
        return;
      }
      setUserHelper(state, payload);
      state.isAuth = true;
      onLoadEnd(state);
    });

    // send code
    buider.addCase(requestForSendCode.pending, state => {
      state.isLoading = true;
    });

    buider.addCase(requestForSendCode.fulfilled, (state, { payload }) => {
      state.restoreCred = {
        email: payload.email,
        id: payload.id,
      };
      state.isLoading = false;
    });

    buider.addCase(requestForSendCode.rejected, state => {
      state.isLoading = false;
    });

    // update info
    buider.addCase(updateUserInfo.pending, state => {
      state.isLoading = true;
    });
    buider.addCase(updateUserInfo.fulfilled, (state, { payload }) => {
      setUserHelper(state, payload);
      state.isLoading = false;
    });
    buider.addCase(updateUserInfo.rejected, state => {
      state.isLoading = false;
    });

    // update password
    buider.addCase(updatePassword.pending, state => {
      state.isLoading = true;
    });
    buider.addCase(updatePassword.fulfilled, (state, { payload }) => {
      setUserHelper(state, payload);
      state.isLoading = false;
    });
    buider.addCase(updatePassword.rejected, state => {
      state.isLoading = false;
    });

    // update mirror
    buider.addCase(updateMirror.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user!.bio = payload?.bio ?? '';
        state.user!.facebookUrl = payload?.facebookUrl;
        state.user!.instagramUrl = payload?.instagramUrl;
        if (payload?.mirror) {
          state.user!.mirrorLink = payload?.mirror;
        }
      }
    });

    // update store settings
    buider.addCase(updateStoreSettings.fulfilled, (state, { payload }) => {
      if (state.ownMerchant && payload) {
        state.ownMerchant.name = payload.name;
        state.ownMerchant.shipping_fee = payload.shippingFee;
      }
    });
  },
});

export const {
  setUser,
  setIsLoading,
  setIsAuth,
  addCode,
  setCurrentMerchat,
  setColor,
  setOwnMerchant,
  resetState,
} = main.actions;

export default main.reducer;
