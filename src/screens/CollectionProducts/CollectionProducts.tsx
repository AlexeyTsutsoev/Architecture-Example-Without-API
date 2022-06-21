import React, { FC, useMemo } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/core';
import { RootHomeParamList } from '../../navigation/HomeNavigation/HomeNavigation';
import ImagedHeader from '../../components/UIComponents/ImagedHeader/ImagedHeader';
import { useAppSelector } from '../../redux/store';
import SplashScreen from '../SplashScreen/SplashScreen';
import prepareProduct, { PreparedProduct } from '../../utils/prepareProduct';
import CollectionItem from '../../components/UIComponents/CollectionItem/CollectionItem';
import styles from './CollectionProducts.style';

type CustomRouteProps = RouteProp<RootHomeParamList, 'CollectionProducts'>;

const CollectionProducts: FC = () => {
  // navigation
  const { collection } = useRoute<CustomRouteProps>().params;

  // redux
  const { isLoading, products } = useAppSelector(state => state.products);

  // memo
  const preparedProduct = useMemo(
    () =>
      products?.map(prod => prepareProduct({ item: prod, type: 'product' })),
    [products],
  );

  // helpers
  const getImage = () => {
    const uri = collection.cover_image.original_url;
    return uri ? { uri } : require('../../assets/pngs/EmptyImage.png');
  };

  // renders
  const renderItem = ({ item }: ListRenderItemInfo<PreparedProduct>) => {
    return (
      <View style={styles.contentContainer}>
        <CollectionItem product={item} />
      </View>
    );
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={preparedProduct}
        keyExtractor={product => product.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <ImagedHeader
            title={collection.name}
            subTitle={`${collection.products_count} items`}
            image={getImage()}
            isContain
          />
        }
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={styles.headerStyle}
      />
    </View>
  );
};

export default CollectionProducts;
