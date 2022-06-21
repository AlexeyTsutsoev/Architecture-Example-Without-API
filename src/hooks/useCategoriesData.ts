import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { loadCollections } from '../redux/collections/thunks';
import { loadProducts } from '../redux/products/thunks';
import { incrementCurrentPage } from '../redux/collections/reducer';
import { incrementCurrentPage as ProductCurrentIncrement } from '../redux/products/reducer';

export type CategoriesType = 'products' | 'collections';

const useCategoriesData = (type: CategoriesType) => {
  const { collections, pageInfo, isLoading } = useAppSelector(
    state => state.collections,
  );
  const {
    products,
    pageInfo: productPageInfo,
    isLoading: productLoading,
    filters,
    currentCategoryId,
  } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();
  const isInitLoad = useRef(true);

  const dispatchNewItems = useCallback(() => {
    switch (type) {
      case 'collections':
        return dispatch(loadCollections());
      case 'products':
        return dispatch(loadProducts());
      default:
        return null;
    }
  }, [dispatch, type]);

  useEffect(() => {
    if (isInitLoad.current) {
      isInitLoad.current = false;
      return;
    }
    dispatchNewItems();
  }, [
    dispatchNewItems,
    filters,
    pageInfo.currentPage,
    productPageInfo.currentPage,
    currentCategoryId,
  ]);

  const dataInfo = useMemo(() => {
    let data;
    let loadingStatus;
    let incrementPage;
    switch (type) {
      case 'collections':
        data = collections;
        loadingStatus = isLoading;
        incrementPage = incrementCurrentPage;
        break;
      case 'products':
        data = products;
        loadingStatus = productLoading;
        incrementPage = ProductCurrentIncrement;
        break;
      default:
        data = collections;
        loadingStatus = isLoading;
        incrementPage = incrementCurrentPage;
    }
    return {
      data,
      loadingStatus,
      incrementPage,
    };
  }, [type, collections, isLoading, products, productLoading]);

  return dataInfo;
};

export default useCategoriesData;
