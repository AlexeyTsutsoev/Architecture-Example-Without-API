import React, { FC, useMemo, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  ListRenderItemInfo,
  Pressable,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootHomeParamList } from '../../../../navigation/HomeNavigation/HomeNavigation';
import { ProductTypeFromServer } from '../../../../API/responsesTypes';
import { CollectionItemType } from '../../../../redux/collections/reducer';

import { reloadProducts, setSearch } from '../../../../redux/products/reducer';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { loadProducts } from '../../../../redux/products/thunks';

import CustomSearchInput from '../../../../components/inputs/CustomSearchInput/CustomSearchInput';
import CollectionItem from '../CollectionItem/CollectionItem';
import HeaderOfList from '../HeaderOfList/HeaderOfList';
import ProductItem from '../ProductItem/ProductItem';
import ImagedHeader from '../../../../components/UIComponents/ImagedHeader/ImagedHeader';
import prepareProduct from '../../../../utils/prepareProduct';

import styles from './HeaderOfScreen.style';

type NavigationProps = StackNavigationProp<RootHomeParamList, 'HomeScreen'>;

const HeaderOfScreen: FC = () => {
  // screen state
  const [value, setValue] = useState<string>('');

  // navigation
  const navigation = useNavigation<NavigationProps>();

  // redux
  const { collections } = useAppSelector(state => state.collections);
  const { products } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();

  // memo for header
  const coverImage = useMemo(() => {
    const uri = collections && collections[0]?.cover_image.original_url;
    return uri ? { uri } : require('../../../../assets/pngs/EmptyImage.png');
  }, [collections]);

  // helpers
  const dispatchSearch = () => {
    if (value === '') {
      return;
    }
    dispatch(reloadProducts());
    dispatch(setSearch(value));
    dispatch(loadProducts());
    navigateToCategories('Products');
  };

  const navigateToCategories = (title: string) => {
    navigation.navigate('Categories', { title, searchValue: value });
  };

  const navigateToCollectionList = () => {
    navigation.navigate('Collections');
  };

  const navigateToMainCollection = () => {
    if (!collections) {
      return;
    }
    navigation.navigate('CollectionProducts', { collection: collections[0] });
  };

  const navigateToProductDetail = (product: ProductTypeFromServer) => {
    navigation.navigate('ProductDetailScreen', {
      item: prepareProduct({ type: 'product', item: product }),
    });
  };

  const navigateToProductsWithFilters = () => {
    navigation.navigate('Categories', {
      title: 'Products',
      isSHowFilter: true,
    });
  };

  const renderCollection = ({
    item,
  }: ListRenderItemInfo<CollectionItemType>) => <CollectionItem item={item} />;

  const renderProducts = ({
    item,
  }: ListRenderItemInfo<ProductTypeFromServer>) => {
    const cover = item.images[0]?.original_url ?? item.image?.original_url;
    return (
      <ProductItem
        id={item.id}
        title={item.name}
        cover={cover}
        price={item.display_amount}
        added={!!item.added_to_reseller_catalog}
        resellerId={item.reseller_catalog_item_id ?? ''}
        onPress={() => navigateToProductDetail(item)}
      />
    );
  };

  return (
    collections && (
      <View style={styles.headerContainer}>
        <Pressable onPress={navigateToMainCollection}>
          <ImagedHeader
            image={coverImage}
            title={collections[0]?.name}
            subTitle={`${collections[0]?.products_count} items`}
            isContain
            isHideBackBtn={true}
          />
        </Pressable>
        <View style={styles.headerContent}>
          <View style={styles.itemContainer}>
            <CustomSearchInput
              value={value}
              onChangeText={setValue}
              onPressAccessory={navigateToProductsWithFilters}
              accessoryRight
              onSubmitEditing={dispatchSearch}
            />
          </View>
          <View style={styles.listContainer}>
            <HeaderOfList
              onPress={navigateToCollectionList}
              title="Collections"
            />
            <FlatList
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              data={collections.slice(0, 9)}
              renderItem={renderCollection}
              horizontal
            />
          </View>
          <View style={styles.listContainer}>
            <HeaderOfList
              onPress={() => navigateToCategories('Most Popular')}
              title="Most Popular"
            />
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={products?.slice(1, 9)}
              renderItem={renderProducts}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              horizontal
            />
          </View>
          <Text style={styles.title}>Feed</Text>
        </View>
      </View>
    )
  );
};

export default HeaderOfScreen;
