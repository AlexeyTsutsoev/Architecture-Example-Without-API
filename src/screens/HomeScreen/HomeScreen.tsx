import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ListRenderItemInfo,
  KeyboardAvoidingView,
} from 'react-native';

import { RootHomeParamList } from '../../navigation/HomeNavigation/HomeNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useNavigation } from '@react-navigation/native';
import { loadCategories, loadProducts } from '../../redux/products/thunks';
import { incrementCurrentPage } from '../../redux/products/reducer';
import { loadOrders } from '../../redux/orders/thunk';
import { loadResellerProducts } from '../../redux/resellerProducts/thunk';

import { loadCollections } from '../../redux/collections/thunks';
import SplashScreen from '../SplashScreen/SplashScreen';
import ProductItem from './components/ProductItem/ProductItem';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import HeaderOfScreen from './components/HeaderOfScreen/HeaderOfScreen';
import EmptyContainer from './components/EmptyContainer/EmptyContainer';

import { ProductTypeFromServer } from '../../API/responsesTypes';

import styles from './HomeScreen.style';
import prepareProduct from '../../utils/prepareProduct';

type NavigationProps = StackNavigationProp<RootHomeParamList, 'HomeScreen'>;

const HomeScreen: FC = () => {
  // navigation
  const navigation = useNavigation<NavigationProps>();

  // redux
  const { products, pageInfo } = useAppSelector(state => state.products);
  const collectionLoading = useAppSelector(
    state => state.collections.isLoading,
  );
  const productLoading = useAppSelector(state => state.products.isLoading);
  const dispatch = useAppDispatch();

  // state
  const [isLoading, setIsLoading] = useState<boolean>(
    productLoading || collectionLoading,
  );

  // memoize
  const loadItems = useCallback(async () => {
    try {
      dispatch(loadCollections());
      dispatch(loadProducts());
      dispatch(loadCategories());
      dispatch(loadOrders());
      dispatch(loadResellerProducts());
    } catch (err) {
      console.log('ERROR_FROM_SCREENS_USEEFFECT', err);
    }
  }, [dispatch]);

  const loadMoreHandler = useCallback(async () => {
    if (!isLoading) {
      setIsLoading(true);
      if (pageInfo.currentPage < pageInfo.page_count) {
        dispatch(incrementCurrentPage());
        await dispatch(loadProducts());
      }
      setIsLoading(false);
    }
  }, [dispatch, isLoading, pageInfo.currentPage, pageInfo.page_count]);

  // effects
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        await loadItems();
      } catch (err) {
        console.log('USE_EFFECT_LOAD_ERROR', err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [loadItems]);

  const navigateToProductDetails = (item: ProductTypeFromServer) => {
    navigation.navigate('ProductDetailScreen', {
      item: prepareProduct({ type: 'product', item }),
    });
  };

  const navigateToSettings = () => {
    navigation.getParent()?.navigate('SettingNavigation');
  };

  const renderProducts = ({
    item,
  }: ListRenderItemInfo<ProductTypeFromServer>) => {
    const cover = item.images[0]?.original_url ?? item.image?.original_url;
    const added = !!item?.added_to_reseller_catalog;
    return (
      <ProductItem
        id={item.id}
        resellerId={item.reseller_catalog_item_id!}
        added={added}
        title={item.name}
        cover={cover}
        price={item.display_amount}
        onPress={() => navigateToProductDetails(item)}
      />
    );
  };

  const renderFooter = () => {
    return isLoading ? (
      <View style={styles.loaderContainer}>
        <CustomLoader />
      </View>
    ) : null;
  };

  if ((productLoading || collectionLoading) && !isLoading) {
    return <SplashScreen />;
  }

  return (
    <KeyboardAvoidingView behavior="position">
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={styles.headerContainer}
        columnWrapperStyle={styles.columnWrapper}
        data={products}
        renderItem={renderProducts}
        keyExtractor={item => item.id}
        onEndReached={loadMoreHandler}
        onEndReachedThreshold={0}
        ListFooterComponent={renderFooter}
        ListHeaderComponent={<HeaderOfScreen />}
        ListEmptyComponent={<EmptyContainer onPress={navigateToSettings} />}
      />
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
