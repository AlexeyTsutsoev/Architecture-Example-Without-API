import React, { FC, useMemo } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';

import { useAppSelector } from '../../redux/store';
import useScale from '../../hooks/useScale';

import CollectionItem from '../../components/UIComponents/CollectionItem/CollectionItem';
import Header from './components/Header/Header';
import SplashScreen from '../SplashScreen/SplashScreen';
import EmptyContainer from './components/EmptyContainer/EmptyContainer';

import prepareProduct, { PreparedProduct } from '../../utils/prepareProduct';
import styles from './ProfileScreen.style';

const ProfileScreen: FC = () => {
  // styles
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  // redux
  const { resellerProducts, isLoading } = useAppSelector(
    state => state.resellerProduct,
  );

  // memo
  const preparedProducts = useMemo(() => {
    if (!resellerProducts) {
      return [];
    }
    return resellerProducts?.map(prod =>
      prepareProduct({ type: 'reseller', item: prod }),
    );
  }, [resellerProducts]);

  //hendlers
  const renderItem = ({ item }: ListRenderItemInfo<PreparedProduct>) => {
    return <CollectionItem product={item} />;
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <View style={stylesWithProps.container}>
      <FlatList
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyContainer />}
        data={preparedProducts}
        renderItem={renderItem}
        ListHeaderComponent={() => <Header />}
        contentContainerStyle={stylesWithProps.listContainer}
      />
    </View>
  );
};

export default ProfileScreen;
