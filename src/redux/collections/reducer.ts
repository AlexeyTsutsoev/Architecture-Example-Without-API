import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadCollections } from './thunks';

type CollectionImage = {
  id: string;
  processing: boolean;
  small_url: string;
  large_url: string;
  original_url: string;
  messander_url: string;
};

export type CollectionItemType = {
  id: string;
  type: string;
  numeric_id: number;
  name: string;
  pretty_name: string;
  description: string;
  permalink: string;
  parent_id: string;
  taxonomy_id: string;
  tags: string[];
  products_count: number;
  cover_image: CollectionImage;
  is_featured: boolean;
};

export type CollectionState = {
  isLoading: boolean;
  collections: CollectionItemType[] | null;
  pageInfo: PageInfo;
};

export type PageInfo = {
  page_count: number;
  record_count: number;
  currentPage: number;
};

const initialState: CollectionState = {
  isLoading: false,
  collections: null,
  pageInfo: {
    page_count: 0,
    record_count: 0,
    currentPage: 1,
  },
};

const collections = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    incrementCurrentPage: state => {
      // state.pageInfo.currentPage = action.payload;
      if (state.pageInfo.currentPage < state.pageInfo.page_count) {
        state.pageInfo.currentPage++;
      }
    },
    setCollectionsCurrentPage: (state, action: PayloadAction<number>) => {
      if (state.pageInfo) {
        state.pageInfo.currentPage = action.payload;
      }
    },
    reloadCollections: state => {
      state.collections = initialState.collections;
      state.isLoading = initialState.isLoading;
      state.pageInfo = initialState.pageInfo;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadCollections.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(loadCollections.fulfilled, (state, action) => {
      if (state.collections && action.payload.items) {
        const source = state.collections;
        state.collections = [...source, ...action.payload.items];
        state.pageInfo = {
          ...action.payload.meta,
          currentPage: state.pageInfo.currentPage,
        };
      } else {
        state.collections = action.payload.items;
        state.pageInfo = {
          ...action.payload.meta,
          currentPage: 1,
        };
      }
      state.isLoading = false;
    });
    builder.addCase(loadCollections.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const {
  setCollectionsCurrentPage,
  incrementCurrentPage,
  reloadCollections,
} = collections.actions;

export default collections.reducer;
