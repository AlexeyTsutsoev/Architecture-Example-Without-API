import React, { FC } from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import LoginScreen from '../../screens/LoginScreen/LoginScreen';
import BuildProfileScreen from '../../screens/BuildProfileScreen/BuildProfileScreen';
import TutorialScreen from '../../screens/TutorialScreen/TutorialScreen';
import SignUpScreen from '../../screens/SignUpScreen/SignUpScreen';
import RestoreCredScreen from '../../screens/RestoreCredScreen/RestoreCredScreen';
import CodeRequestScreen from '../../screens/CodeRequestScreen/CodeRequestScreen';
import EnterNewPass from '../../screens/EnterNewPass/EnterNewPass';

export type RootStackParamList = {
  Login: undefined;
  BuildProfile: undefined;
  TutorialScreen: undefined;
  SignUpScreen: undefined;
  RestoreCredScreen: undefined;
  CodeRequestScreen: undefined;
  EnterNewPass: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const stackNavigationOption: StackNavigationOptions = {
  header: () => null,
};

const RegistrationNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={stackNavigationOption}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="BuildProfile" component={BuildProfileScreen} />
      <Stack.Screen name="TutorialScreen" component={TutorialScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="RestoreCredScreen" component={RestoreCredScreen} />
      <Stack.Screen name="CodeRequestScreen" component={CodeRequestScreen} />
      <Stack.Screen name="EnterNewPass" component={EnterNewPass} />
    </Stack.Navigator>
  );
};

export default RegistrationNavigator;
