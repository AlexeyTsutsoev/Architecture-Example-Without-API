import React, { FC, useCallback, useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { OrdresParamList } from '../../navigation/OrdersNavigation/OrdersNavigation';

import { OrdersItemType } from '../../redux/orders/reducer';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import EmptyContainer from './components/EmptyContainer/EmptyContainer';
import ListItem from './components/ListItem/ListItem';
import styles from './CartScreen.style';
import ListHeader from './components/ListHeader/ListHeader';
import { deleteOrder } from '../../redux/orders/thunk';

type NavigationProps = StackNavigationProp<OrdresParamList, 'CartScreen'>;

const CartScreen: FC = () => {
  // navigation
  const navigation = useNavigation<NavigationProps>();

  // redux
  const { orders } = useAppSelector(state => state.orders);
  const dispatch = useAppDispatch();

  // state
  const [isComplited, setIsComplited] = useState<boolean>(false);

  // memoize
  const ordersForRender = useMemo(() => {
    if (isComplited) {
      return orders?.filter(order => order.state !== 'cart');
    }
    return orders?.filter(order => order.state === 'cart');
  }, [isComplited, orders]);

  const deleteAnOrder = useCallback(
    async (id: string) => {
      await dispatch(deleteOrder(id));
    },
    [dispatch],
  );

  // renders
  const renderItem = ({ item }: ListRenderItemInfo<OrdersItemType>) => {
    return (
      <ListItem
        onDelete={deleteAnOrder}
        item={item}
        onPress={navigateToDetails}
      />
    );
  };

  const renderEmptyComponent = () => <EmptyContainer />;

  const renderHeader = () => {
    return (
      <ListHeader
        isComplited={isComplited}
        setComplited={setComplited}
        setPending={setPending}
      />
    );
  };

  // helpers
  const navigateToDetails = (item: OrdersItemType) => {
    navigation.navigate('OrderDetailScreen', { item });
  };

  const setComplited = () => {
    setIsComplited(true);
  };

  const setPending = () => {
    setIsComplited(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.contentContainerStyle}
        data={ordersForRender}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
};

export default CartScreen;
