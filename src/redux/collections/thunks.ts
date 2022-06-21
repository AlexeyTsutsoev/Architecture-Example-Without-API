import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCollectionsFromAPI } from '../../API/taxons';
import { RootState, AppDispatch } from '../store';
import { CollectionItemType, PageInfo } from './reducer';

type ItemsWithMetaType = {
  items: CollectionItemType[];
  meta: PageInfo;
};

export const loadCollections = createAsyncThunk<
  ItemsWithMetaType,
  void,
  { state: RootState; dispatch: AppDispatch }
>(
  'collections/getCollectionsFromAPI',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { data } = await getCollectionsFromAPI({
        page: getState().collections.pageInfo.currentPage,
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);
