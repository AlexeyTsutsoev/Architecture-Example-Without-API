import React, { FC, useLayoutEffect } from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {
  getFocusedRouteNameFromRoute,
  NavigationProp,
  RouteProp,
} from '@react-navigation/native';

import MainHeader from '../components/MainHeader/MainHeader';

import { AddressesType } from '../../redux/addresses/reducer';
import { HelpItem } from '../../screens/HelpScreen/info';
import screens from './screens';

export type SettingParamList = {
  SettingScreen: undefined;
  ProfileSettingScreen: undefined;
  ChangePassScreen: undefined;
  StoreSettingScreen: undefined;
  MyAddressScreen: undefined;
  MyWalletScreen: undefined;
  BankAccountScreen: undefined;
  HelpScreen: undefined;
  AddressInfoFormScreen: { address: AddressesType } | undefined;
  HelpDescriptionScreen: { item: HelpItem };
  EditMirrorScreen: undefined;
};

const SettingStack = createStackNavigator<SettingParamList>();

const navigationOptions: StackNavigationOptions = {
  header: props => <MainHeader {...props} />,
};

type NavProps = {
  route: RouteProp<SettingParamList>;
  navigation: NavigationProp<SettingParamList>;
};

const SettingNavigation: FC<NavProps> = ({ route, navigation }) => {
  useLayoutEffect(() => {
    const focusedRoute = getFocusedRouteNameFromRoute(route);
    if (focusedRoute === 'EditMirrorScreen') {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);

  return (
    <SettingStack.Navigator screenOptions={navigationOptions}>
      {screens.map(screen => (
        <SettingStack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </SettingStack.Navigator>
  );
};

export default SettingNavigation;
