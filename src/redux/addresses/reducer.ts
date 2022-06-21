import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProvincesFromServer } from '../../API/responsesTypes';
import {
  archiveAdress,
  createNewAddress,
  deleteAddress,
  getProvinces,
  loadAddresses,
  setDefaultAddress,
  udateAddressRequest,
  unarchiveAdress,
} from './thunk';

export type AddressesType = {
  id?: string;
  type?: string;
  userId?: string;
  addressId?: string;
  firstName?: string;
  lastName?: null | string;
  fullName?: string;
  address1?: string;
  address2?: null | string;
  city?: string;
  phone?: null | string;
  email?: null | string;
  postalCode?: null | string;
  province?: string;
  country?: string;
  fullAddress?: string;
  rawAddress?: null;
  forceAddress?: boolean;
  isDefault?: boolean;
  archived?: boolean;
};

export type AddressesState = {
  isLoading: boolean;
  addresses: AddressesType[] | null;
  provinces: ProvincesFromServer[] | null;
};

const initialState: AddressesState = {
  isLoading: false,
  addresses: null,
  provinces: null,
};

// helpers
const onLoadStart = (state: AddressesState) => {
  state.isLoading = true;
};

const onLoadEnd = (state: AddressesState) => {
  state.isLoading = false;
};

const updateAddresses = (
  state: AddressesState,
  {
    payload,
  }: PayloadAction<
    AddressesType | undefined,
    string,
    {
      arg: { id: string };
      requestId: string;
      requestStatus: 'fulfilled';
    },
    never
  >,
) => {
  if (payload) {
    const newState = state.addresses?.map(address => {
      if (address.id !== payload.id) {
        return address;
      }
      return payload;
    });
    if (newState) {
      state.addresses = newState;
    }
  }
  state.isLoading = false;
};

const setNewAddresses = (
  state: AddressesState,
  {
    payload,
  }: PayloadAction<
    AddressesType[] | undefined,
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
    state.addresses = payload;
  }
  state.isLoading = false;
};

const addressees = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
    setStateLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: builder => {
    //load addresses
    builder.addCase(loadAddresses.pending, onLoadStart);

    builder.addCase(loadAddresses.fulfilled, setNewAddresses);

    builder.addCase(loadAddresses.rejected, onLoadEnd);

    //delete address
    builder.addCase(deleteAddress.pending, onLoadStart);

    builder.addCase(deleteAddress.fulfilled, setNewAddresses);

    builder.addCase(deleteAddress.rejected, onLoadEnd);

    // archive
    builder.addCase(archiveAdress.pending, onLoadStart);

    builder.addCase(archiveAdress.fulfilled, updateAddresses);

    builder.addCase(archiveAdress.rejected, onLoadEnd);

    // unarchive
    builder.addCase(unarchiveAdress.pending, onLoadStart);

    builder.addCase(unarchiveAdress.fulfilled, updateAddresses);

    builder.addCase(unarchiveAdress.rejected, onLoadEnd);

    // make default
    builder.addCase(setDefaultAddress.pending, onLoadStart);

    builder.addCase(setDefaultAddress.fulfilled, updateAddresses);

    builder.addCase(setDefaultAddress.rejected, onLoadEnd);

    //update address
    builder.addCase(udateAddressRequest.pending, onLoadStart);

    builder.addCase(udateAddressRequest.fulfilled, updateAddresses);

    builder.addCase(udateAddressRequest.rejected, onLoadEnd);

    //create new address
    builder.addCase(createNewAddress.pending, onLoadStart);

    builder.addCase(createNewAddress.fulfilled, (state, action) => {
      if (action.payload) {
        state.addresses?.push(action.payload);
      }
      onLoadEnd(state);
    });

    builder.addCase(createNewAddress.rejected, onLoadEnd);

    // get provinces
    builder.addCase(getProvinces.pending, onLoadStart);

    builder.addCase(getProvinces.fulfilled, (state, { payload }) => {
      state.provinces = payload;
      onLoadEnd(state);
    });

    builder.addCase(getProvinces.rejected, onLoadEnd);
  },
});

export const { setStateLoading } = addressees.actions;

export default addressees.reducer;
