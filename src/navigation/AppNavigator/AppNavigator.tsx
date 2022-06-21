import React, { FC } from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import SettingNavigation from '../SettingNavigation/SettingNavigation';
import StoreNavigation from '../StoreNavigation/StoreNavigation';
import HomeNavigator from '../HomeNavigation/HomeNavigation';
import OrdersNavigation from '../OrdersNavigation/OrdersNavigation';

import BottomHeader from '../components/BottomHeader/BottomHeader';
import CartIcon from '../components/CartIcon/CartIcon';

import colors from '../../utils/theme/colors/colors';
import Home from '../../assets/svgs/bottomNavIcons/Home.svg';
import Menu from '../../assets/svgs/bottomNavIcons/Menu.svg';
import Profile from '../../assets/svgs/bottomNavIcons/Profile.svg';

export type RootAppParamList = {
  HomeNavigator: undefined;
  StoreNavigation: undefined;
  OrdersNavigation: undefined;
  SettingNavigation: undefined;
};

const Tab = createBottomTabNavigator<RootAppParamList>();

const tabOptions: BottomTabNavigationOptions = {
  header: props => <BottomHeader {...props} />,
  tabBarLabel: () => null,
};

const HomeNavigatorOptions: BottomTabNavigationOptions = {
  header: () => null,
  tabBarIcon: props => (
    <Home fill={props.focused ? colors.navBlack : colors.navGray} />
  ),
};

const profileScreenOptions: BottomTabNavigationOptions = {
  header: () => null,
  tabBarIcon: props => (
    <Profile fill={props.focused ? colors.navBlack : colors.navGray} />
  ),
};

const ordersNavigationOptions: BottomTabNavigationOptions = {
  header: () => null,
  tabBarIcon: props => <CartIcon isFocused={props.focused} />,
};

const settingScreenOptions: BottomTabNavigationOptions = {
  header: () => null,
  tabBarIcon: props => (
    <Menu fill={props.focused ? colors.navBlack : colors.navGray} />
  ),
};

const AppNavigator: FC = () => {
  return (
    <Tab.Navigator screenOptions={tabOptions}>
      <Tab.Screen
        name="HomeNavigator"
        options={HomeNavigatorOptions}
        component={HomeNavigator}
      />
      <Tab.Screen
        name="StoreNavigation"
        options={profileScreenOptions}
        component={StoreNavigation}
      />
      <Tab.Screen
        name="OrdersNavigation"
        options={ordersNavigationOptions}
        component={OrdersNavigation}
      />
      <Tab.Screen
        name="SettingNavigation"
        options={settingScreenOptions}
        component={SettingNavigation}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
