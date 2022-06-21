import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ResellerImage,
  ResellerVariant,
  ShippingMethod,
} from '../../API/responsesTypes';
import { ProductsQuery } from '../../API/taxons';
import { PageInfo } from '../collections/reducer';
import { editPrice, loadResellerProducts } from './thunk';

// types
export type CamelCasedResellerProdustType = {
  id: string;
  productId: string;
  name: string;
  description: string;
  price: string;
  currency: string;
  displayAmount: string;
  resellerCommission: string;
  images: ResellerImage[];
  variants: ResellerVariant[];
  masterVariant: ResellerVariant;
  shippingMethods: ShippingMethod[];
  productUrl: string;
  resellerDisplayApproxMargin: string;
  percentageMarkup: number;
};

type ProductResellerState = {
  isLoading: boolean;
  filters: ProductsQuery;
  resellerProducts: CamelCasedResellerProdustType[] | null;
  pageInfo: PageInfo;
};

// initial state
const initialState: ProductResellerState = {
  isLoading: false,
  resellerProducts: null,
  filters: {},
  pageInfo: {
    page_count: 0,
    record_count: 0,
    currentPage: 1,
  },
};

// helpers
const onLoadStart = (state: ProductResellerState) => {
  state.isLoading = true;
};

const onLoadEnd = (state: ProductResellerState) => {
  state.isLoading = false;
};

const setToInitial = (state: ProductResellerState) => {
  state.pageInfo = initialState.pageInfo;
  state.resellerProducts = initialState.resellerProducts;
  state.isLoading = initialState.isLoading;
  state.filters = initialState.filters;
};

const resellerProduct = createSlice({
  name: 'resellerProduct',
  initialState,
  reducers: {
    incrementCurrentPage: state => {
      if (state.pageInfo.currentPage < state.pageInfo.page_count) {
        state.pageInfo.currentPage++;
      }
    },
    reloadResllerProduct: setToInitial,
    addResellerProduct: (
      state,
      { payload }: PayloadAction<CamelCasedResellerProdustType>,
    ) => {
      if (state.resellerProducts) {
        state.resellerProducts.unshift(payload);
        return;
      }
      state.resellerProducts = [payload];
    },
    remoeRessellerProduct: (state, { payload }: PayloadAction<string>) => {
      const target = state.resellerProducts;
      if (target) {
        state.resellerProducts = target.filter(prod => prod.id !== payload);
      }
    },
    setResellerSearch: (state, { payload }: PayloadAction<string>) => {
      if (payload.length < 1) {
        state.filters = initialState.filters;
        return;
      }
      state.filters.q = payload;
    },
  },
  extraReducers: builder => {
    // loadResellerProducts
    builder.addCase(loadResellerProducts.pending, onLoadStart);

    builder.addCase(loadResellerProducts.fulfilled, (state, { payload }) => {
      if (payload) {
        state.pageInfo = payload.meta;
        state.resellerProducts = payload.items;
        onLoadEnd(state);
      } else {
        setToInitial(state);
      }
    });

    builder.addCase(loadResellerProducts.rejected, setToInitial);

    // update price
    builder.addCase(editPrice.fulfilled, (state, { payload }) => {
      if (state.resellerProducts) {
        const targetIndex = state.resellerProducts.findIndex(
          rProd => rProd.id === payload.id,
        );
        state.resellerProducts[targetIndex] = payload;
      }
    });
  },
});

export const {
  incrementCurrentPage,
  reloadResllerProduct,
  addResellerProduct,
  remoeRessellerProduct,
  setResellerSearch,
} = resellerProduct.actions;

export default resellerProduct.reducer;
