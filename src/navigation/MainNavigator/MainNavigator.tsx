import React, { FC, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../AppNavigator/AppNavigator';
import RegistrationNavigator from '../RegistrationNavigator/RegistrationNavigator';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { authorize } from '../../redux/main/thunks';
import SplashScreen from 'react-native-splash-screen';

const MainNavigator: FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.main.isAuth);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(authorize());
      } catch (err) {
        console.log('USE_EFFECT_CHECK_USER_ERR', err);
      } finally {
        SplashScreen.hide();
      }
    })();
  }, [dispatch]);

  return (
    <NavigationContainer>
      {isAuth ? <AppNavigator /> : <RegistrationNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;
