import React, { FC, useLayoutEffect } from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {
  RouteProp,
  NavigationProp,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/core';

import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import EditMirrorScreen from '../../screens/EditMirrorScreen/EditMirrorScreen';
import HeaderWithBurger from '../components/HeaderWithBurger/HeaderWithBurger';
import MainHeader from '../components/MainHeader/MainHeader';
import CreateNewProduct from '../../screens/CreateNewProduct/CreateNewProduct';
import PowerUpScreen from '../../screens/PowerUpScreen/PowerUpScreen';
import FireSubScreen from '../../screens/FireSubScreen/FireSubScreen';
import ThunderSubScreen from '../../screens/ThunderSubScreen/ThunderSubScreen';
import PaymentMethodScreen from '../../screens/PaymentMethodScreen/PaymentMethodScreen';
import PaymentSuccessScreen from '../../screens/PaymentSuccessScreen/PaymentSuccessScreen';
import { PreparedProduct } from '../../utils/prepareProduct';
import ProductDetailScreen from '../../screens/ProductDetailScreen/ProductDetailScreen';
import PaymentFailedScreen from '../../screens/PaymentFailedScreen/PaymentFailedScreen';

export type StoreStackParamList = {
  ProfileScreen: undefined;
  EditMirrorScreen: undefined;
  AddNewProduct: undefined;
  PowerUpScreen: undefined;
  FireSubScreen: undefined;
  ThunderSubScreen: undefined;
  PaymentMethodScreen: { price: number; showWindow?: boolean };
  PaymentSuccessScreen: undefined;
  PaymentFailedScreen: undefined;
  ProductDetailScreen: { item: PreparedProduct };
};

const StoreStack = createStackNavigator<StoreStackParamList>();

const stakOption: StackNavigationOptions = {
  title: 'My Store',
};

const profileScreenOptions: StackNavigationOptions = {
  title: 'My Store',
  header: props => <HeaderWithBurger {...props} />,
};

const editMirrorScreen: StackNavigationOptions = {
  header: props => <MainHeader {...props} />,
};

const withoutHeaderOptions: StackNavigationOptions = {
  header: () => null,
};

const paymentOptions: StackNavigationOptions = {
  title: 'Payment method',
  header: props => <MainHeader {...props} />,
};

type NavProps = {
  route: RouteProp<StoreStackParamList>;
  navigation: NavigationProp<StoreStackParamList>;
};

const routesWithoutTabBar = [
  'EditMirrorScreen',
  'AddNewProduct',
  'FireSubScreen',
  'ThunderSubScreen',
  'PaymentMethodScreen',
  'PaymentSuccessScreen',
  'ProductDetailScreen',
  'PaymentFailedScreen',
];

const StoreNavigation: FC<NavProps> = ({ route, navigation }) => {
  useLayoutEffect(() => {
    const focusedRoute = getFocusedRouteNameFromRoute(route);
    if (routesWithoutTabBar.includes(focusedRoute ?? '')) {
      return navigation.setOptions({ tabBarStyle: { display: 'none' } });
    }
    return navigation.setOptions({ tabBarStyle: { display: 'flex' } });
  }, [navigation, route]);
  return (
    <StoreStack.Navigator screenOptions={stakOption}>
      <StoreStack.Screen
        name="ProfileScreen"
        options={profileScreenOptions}
        component={ProfileScreen}
      />
      <StoreStack.Screen
        options={editMirrorScreen}
        name="EditMirrorScreen"
        component={EditMirrorScreen}
      />
      <StoreStack.Screen
        options={editMirrorScreen}
        name="AddNewProduct"
        component={CreateNewProduct}
      />
      <StoreStack.Screen
        options={editMirrorScreen}
        name="PowerUpScreen"
        component={PowerUpScreen}
      />
      <StoreStack.Screen
        options={withoutHeaderOptions}
        name="FireSubScreen"
        component={FireSubScreen}
      />
      <StoreStack.Screen
        options={withoutHeaderOptions}
        name="ThunderSubScreen"
        component={ThunderSubScreen}
      />
      <StoreStack.Screen
        options={paymentOptions}
        name="PaymentMethodScreen"
        component={PaymentMethodScreen}
      />
      <StoreStack.Screen
        options={withoutHeaderOptions}
        name="PaymentSuccessScreen"
        component={PaymentSuccessScreen}
      />
      <StoreStack.Screen
        options={withoutHeaderOptions}
        name="PaymentFailedScreen"
        component={PaymentFailedScreen}
      />
      <StoreStack.Screen
        options={withoutHeaderOptions}
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
    </StoreStack.Navigator>
  );
};

export default StoreNavigation;
