import React, { FC } from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';

import { SettingParamList } from './SettingNavigation';

import BottomHeader from '../components/BottomHeader/BottomHeader';
import SettingScreen from '../../screens/SettingScreen/SettingScreen';
import ProfileSettingScreen from '../../screens/ProfileSettingScreen/ProfileSettingScreen';
import StoreSettingScreen from '../../screens/StoreSettingScreen/StoreSettingScreen';
import MyAddressScreen from '../../screens/MyAddressScreen/MyAddressScreen';
import MyWalletScreen from '../../screens/MyWalletScreen/MyWalletScreen';
import BankAccountScreen from '../../screens/BankAccountScreen/BankAccountScreen';
import HelpScreen from '../../screens/HelpScreen/HelpScreen';
import ChangePassScreen from '../../screens/ChangePassScreen/ChangePassScreen';
import AddressInfoFormScreen from '../../screens/AddressInfoFormScreen/AddressInfoFormScreen';
import HelpDescriptionScreen from '../../screens/HelpDescriptionScreen/HelpDescriptionScreen';
import EditMirrorScreen from '../../screens/EditMirrorScreen/EditMirrorScreen';

type SettingsScreen = {
  name: keyof SettingParamList;
  component: FC;
  options: StackNavigationOptions;
};

const settingScreenOptions: StackNavigationOptions = {
  title: 'Settings',
  header: props => <BottomHeader {...props} />,
};

const profileSettingScreen: StackNavigationOptions = {
  title: 'Profile Settings',
};

const storeSettingScreen: StackNavigationOptions = {
  title: 'Store Settings',
};

const myAddressScreen: StackNavigationOptions = {
  title: 'My Addresses',
};

const myWalletScreen: StackNavigationOptions = {
  title: 'My wallet',
};

const bankAccountScreen: StackNavigationOptions = {
  title: 'Bank Account',
};

const helpScreen: StackNavigationOptions = {
  title: 'Help',
};

const changPassOptions: StackNavigationOptions = {
  title: 'Changing password',
};

const addressInfoFormOptions: StackNavigationOptions = {
  title: 'Address',
};

const helpDescriptionOptions: StackNavigationOptions = {
  title: 'Help',
};

const editMirrirOptions: StackNavigationOptions = {
  title: 'My Store',
};

const screens: SettingsScreen[] = [
  {
    name: 'SettingScreen',
    component: SettingScreen,
    options: settingScreenOptions,
  },
  {
    name: 'ProfileSettingScreen',
    component: ProfileSettingScreen,
    options: profileSettingScreen,
  },
  {
    name: 'StoreSettingScreen',
    component: StoreSettingScreen,
    options: storeSettingScreen,
  },
  {
    name: 'MyAddressScreen',
    component: MyAddressScreen,
    options: myAddressScreen,
  },
  {
    name: 'MyWalletScreen',
    component: MyWalletScreen,
    options: myWalletScreen,
  },
  {
    name: 'BankAccountScreen',
    component: BankAccountScreen,
    options: bankAccountScreen,
  },
  {
    name: 'HelpScreen',
    component: HelpScreen,
    options: helpScreen,
  },
  {
    name: 'ChangePassScreen',
    component: ChangePassScreen,
    options: changPassOptions,
  },
  {
    name: 'AddressInfoFormScreen',
    component: AddressInfoFormScreen,
    options: addressInfoFormOptions,
  },
  {
    name: 'HelpDescriptionScreen',
    component: HelpDescriptionScreen,
    options: helpDescriptionOptions,
  },
  {
    name: 'EditMirrorScreen',
    component: EditMirrorScreen,
    options: editMirrirOptions,
  },
];

export default screens;
