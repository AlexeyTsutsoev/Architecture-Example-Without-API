import React, { FC, useLayoutEffect } from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import BottomHeader from '../components/BottomHeader/BottomHeader';
import Categories from '../../screens/Categories/Categories';
import MainHeader from '../components/MainHeader/MainHeader';
import ProductDetailScreen from '../../screens/ProductDetailScreen/ProductDetailScreen';
import {
  getFocusedRouteNameFromRoute,
  RouteProp,
} from '@react-navigation/core';
import Collections from '../../screens/Collections/Collections';
import { PreparedProduct } from '../../utils/prepareProduct';
import { CollectionItemType } from '../../redux/collections/reducer';
import CollectionProducts from '../../screens/CollectionProducts/CollectionProducts';

export type RootHomeParamList = {
  HomeScreen: undefined;
  Categories: { title?: string; searchValue?: string; isSHowFilter?: boolean };
  ProductDetailScreen: { item: PreparedProduct };
  Collections: undefined;
  CollectionProducts: { collection: CollectionItemType };
};

type NavProps = {
  route: RouteProp<RootHomeParamList>;
  navigation: any;
};

const options: StackNavigationOptions = {
  header: props => <BottomHeader {...props} />,
};

const homeScreenOptions: StackNavigationOptions = {
  title: 'Home',
};

const categorioesOptions: StackNavigationOptions = {
  title: 'Products',
  header: props => <MainHeader {...props} />,
};
const collectionsOptions: StackNavigationOptions = {
  title: 'Collections',
  header: props => <MainHeader {...props} />,
};

const productDetailScreenOptions: StackNavigationOptions = {
  header: () => null,
};

const HomeStack = createStackNavigator<RootHomeParamList>();

const HomeNavigator: FC<NavProps> = ({ route, navigation }) => {
  useLayoutEffect(() => {
    const focusedRoute = getFocusedRouteNameFromRoute(route);
    if (focusedRoute === 'ProductDetailScreen') {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);

  return (
    <HomeStack.Navigator screenOptions={options} initialRouteName="HomeScreen">
      <HomeStack.Screen
        options={homeScreenOptions}
        name="HomeScreen"
        component={HomeScreen}
      />
      <HomeStack.Screen
        options={categorioesOptions}
        name="Categories"
        component={Categories}
      />
      <HomeStack.Screen
        options={productDetailScreenOptions}
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
      <HomeStack.Screen
        options={collectionsOptions}
        name="Collections"
        component={Collections}
      />
      <HomeStack.Screen
        options={productDetailScreenOptions}
        name="CollectionProducts"
        component={CollectionProducts}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
