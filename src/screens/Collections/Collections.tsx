import React, { FC } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import {
  CollectionItemType,
  incrementCurrentPage,
} from '../../redux/collections/reducer';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import CollectionElement from './CollectionElement/CollectionElement';
import { loadCollections } from '../../redux/collections/thunks';
import styles from './Collections.style';
import CustomLoader from '../../components/CustomLoader/CustomLoader';

const Collections: FC = () => {
  // redux
  const dispatch = useAppDispatch();
  const { isLoading, collections, pageInfo } = useAppSelector(
    state => state.collections,
  );

  const renderItem = ({ item }: ListRenderItemInfo<CollectionItemType>) => {
    return <CollectionElement item={item} />;
  };

  const loadMoreHandler = () => {
    if (!isLoading) {
      if (pageInfo.currentPage < pageInfo.page_count) {
        dispatch(incrementCurrentPage());
        dispatch(loadCollections());
      }
    }
  };

  const renderFooter = () => {
    return isLoading ? <CustomLoader /> : null;
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={collections}
        renderItem={renderItem}
        onEndReachedThreshold={0}
        onEndReached={loadMoreHandler}
        style={styles.contentContainer}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default Collections;
