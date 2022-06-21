import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductTypeFromServer } from '../../API/responsesTypes';
import { PageInfo } from '../collections/reducer';
import {
  addToMyStore,
  deleteFromMyStore,
  loadCategories,
  loadProducts,
  RessellerAddInfo,
} from './thunks';

type QueryType = {
  price?: string;
  created_at?: string;
  q?: string;
};

type Filters = {
  low: number;
  high: number;
  created_at?: string;
  currentCategoryId: string;
};

export type Taxons = {
  children: string[];
  id: string;
  name: string;
  pretty_name?: string;
  parentId: string | null;
};

export type NormalizedTaxons = {
  rootIds: string[];
  allCategories: { [key: string]: Taxons };
};

type ProductsState = {
  isLoading: boolean;
  products: ProductTypeFromServer[] | null;
  pageInfo: PageInfo;
  filters: QueryType;
  currentCategoryId: string | null;
  categories: NormalizedTaxons | null;
};

const initialState: ProductsState = {
  isLoading: false,
  products: null,
  pageInfo: {
    page_count: 0,
    record_count: 0,
    currentPage: 1,
  },
  filters: {} as QueryType,
  currentCategoryId: null,
  categories: null,
};

// helpers
const setAdded = (
  state: ProductsState,
  { payload }: PayloadAction<RessellerAddInfo>,
) => {
  state.products = state.products!.map(prod => {
    if (prod.id !== payload.id) {
      return prod;
    }
    prod.added_to_reseller_catalog = payload.value;
    prod.reseller_catalog_item_id = payload.resellerId ?? null;
    return prod;
  });
};

const setRemoved = (
  state: ProductsState,
  { payload }: PayloadAction<RessellerAddInfo>,
) => {
  state.products = state.products!.map(prod => {
    if (prod.reseller_catalog_item_id !== payload.id) {
      return prod;
    }
    prod.added_to_reseller_catalog = payload.value;
    prod.reseller_catalog_item_id = payload.resellerId ?? null;
    return prod;
  });
};

const products = createSlice({
  name: 'products',
  initialState,
  reducers: {
    incrementCurrentPage: state => {
      if (state.pageInfo.currentPage < state.pageInfo.page_count) {
        state.pageInfo.currentPage++;
      }
    },
    reloadProducts: state => {
      state.isLoading = initialState.isLoading;
      state.products = initialState.products;
      state.pageInfo = initialState.pageInfo;
      state.filters = initialState.filters;
      state.currentCategoryId = initialState.currentCategoryId;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.q = action.payload;
    },
    setPriceFilter: (state, action: PayloadAction<string>) => {
      state.filters.price = action.payload;
    },
    setTime: (state, action: PayloadAction<string>) => {
      state.filters.created_at = action.payload;
    },
    setCurrentCategoryID: (state, action: PayloadAction<string | null>) => {
      state.currentCategoryId = action.payload;
    },
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.isLoading = initialState.isLoading;
      state.products = initialState.products;
      state.pageInfo = initialState.pageInfo;
      if (action.payload.low !== 100 || action.payload.high !== 5000) {
        state.filters.price = `lt${action.payload.low},gt${action.payload.high}`;
      } else {
        state.filters.price = initialState.filters.price;
      }
      if (action.payload.created_at) {
        state.filters.created_at = `lt${action.payload.created_at}`;
      } else {
        state.filters.created_at = initialState.filters.created_at;
      }
      if (action.payload.currentCategoryId) {
        state.currentCategoryId = action.payload.currentCategoryId;
      } else {
        state.currentCategoryId = initialState.currentCategoryId;
      }
    },
  },
  extraReducers: builder => {
    //load products
    builder.addCase(loadProducts.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(loadProducts.fulfilled, (state, action) => {
      if (state.products && action.payload.items) {
        const source = state.products;
        state.products = [...source, ...action.payload.items];
        state.pageInfo = {
          ...action.payload.meta,
          currentPage: state.pageInfo.currentPage,
        };
      } else {
        state.products = action.payload.items;
        state.pageInfo = {
          ...action.payload.meta,
          currentPage: 1,
        };
      }
      state.isLoading = false;
    });

    builder.addCase(loadProducts.rejected, state => {
      state.isLoading = false;
    });

    // categories
    builder.addCase(loadCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });

    // setAdded
    builder.addCase(addToMyStore.fulfilled, setAdded);

    //setRemoved
    builder.addCase(deleteFromMyStore.fulfilled, setRemoved);
  },
});

export const {
  incrementCurrentPage,
  reloadProducts,
  setPriceFilter,
  setSearch,
  setTime,
  setCurrentCategoryID,
  setFilters,
} = products.actions;

export default products.reducer;
