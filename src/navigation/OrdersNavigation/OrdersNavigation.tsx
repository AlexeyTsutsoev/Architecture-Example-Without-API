import React, { FC, useLayoutEffect } from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import CartScreen from '../../screens/CartScreen/CartScreen';
import OrderDetailScreen from '../../screens/OrderDetailScreen/OrderDetailScreen';
import BottomHeader from '../components/BottomHeader/BottomHeader';

import { OrdersItemType } from '../../redux/orders/reducer';
import {
  RouteProp,
  getFocusedRouteNameFromRoute,
  NavigationProp,
} from '@react-navigation/native';
import MainHeader from '../components/MainHeader/MainHeader';
import ProceedScreen from '../../screens/ProceedScreen/ProceedScreen';
import ProductInOrderScreen from '../../screens/ProductInOrderScreen/ProductInOrderScreen';
import { LineItem } from '../../API/responsesTypes';

export type OrdresParamList = {
  CartScreen: undefined;
  OrderDetailScreen: { item: OrdersItemType };
  ProceedScreen: undefined;
  ProductInOrderScreen: { item: LineItem; isComplete: boolean };
};

const cartScreenOptions: StackNavigationOptions = {
  title: 'orders',
  header: props => <BottomHeader {...props} />,
};

const orderDetailsOptions: StackNavigationOptions = {
  header: () => null,
};

const proceedScreenOptions: StackNavigationOptions = {
  title: 'shipping address',
  header: props => <MainHeader {...props} />,
};

const OrdersStack = createStackNavigator<OrdresParamList>();

type NavProps = {
  route: RouteProp<OrdresParamList>;
  navigation: NavigationProp<OrdresParamList>;
};

const OrdersNavigation: FC<NavProps> = ({ route, navigation }) => {
  useLayoutEffect(() => {
    const focusedRoute = getFocusedRouteNameFromRoute(route);

    if (focusedRoute !== 'CartScreen' && focusedRoute) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen
        options={cartScreenOptions}
        name="CartScreen"
        component={CartScreen}
      />
      <OrdersStack.Screen
        options={orderDetailsOptions}
        name="OrderDetailScreen"
        component={OrderDetailScreen}
      />
      <OrdersStack.Screen
        options={proceedScreenOptions}
        name="ProceedScreen"
        component={ProceedScreen}
      />
      <OrdersStack.Screen
        options={orderDetailsOptions}
        name="ProductInOrderScreen"
        component={ProductInOrderScreen}
      />
    </OrdersStack.Navigator>
  );
};

export default OrdersNavigation;
