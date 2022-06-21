import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ValueType } from 'react-native-dropdown-picker';

export type socialLink = {
  title: string;
  url: string;
  id: string;
};

type MainInfo = {
  firstName: string;
  lastName: string;
  dob: string | Date | null;
  country: ValueType;
  phoneNumber: string;
  gender: ValueType;
};

type StoreInfo = {
  storeName: string;
  storeDecription: string;
};

export type BuildProfileState = {
  socialLinks: socialLink[];
} & MainInfo &
  StoreInfo;

const initialValues: BuildProfileState = {
  firstName: '',
  lastName: '',
  dob: null,
  gender: '',
  country: '',
  phoneNumber: '',
  storeName: '',
  storeDecription: '',
  socialLinks: [] as socialLink[],
};

const profileInfo = createSlice({
  name: 'buildProfile',
  initialState: initialValues,
  reducers: {
    updateSocisalWebs: (store, action: PayloadAction<socialLink[]>) => {
      store.socialLinks = action.payload;
    },
    updateUrls: (store, { payload }) => {
      store.socialLinks.forEach(link => {
        if (link.id !== payload.id) {
          return;
        }
        link.url = payload.text;
      });
    },
    updateMainInfo: (store, action: PayloadAction<MainInfo>) => ({
      ...store,
      ...action.payload,
    }),
    updateStoreInfo: (store, action: PayloadAction<StoreInfo>) => ({
      ...store,
      ...action.payload,
    }),
  },
});

export const {
  updateSocisalWebs,
  updateUrls,
  updateMainInfo,
  updateStoreInfo,
} = profileInfo.actions;

export default profileInfo.reducer;
