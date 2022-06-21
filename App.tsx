/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';
import React, { FC } from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import MainNavigator from './src/navigation/MainNavigator';
import { store } from './src/redux/store';
import globalStyles from './src/utils/theme/globalStyles/globalStyles';
import { decode, encode } from 'base-64';
import { MenuProvider } from 'react-native-popup-menu';

// for Android case
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const App: FC = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={globalStyles.MainContainer}>
        <MenuProvider>
          <MainNavigator />
        </MenuProvider>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
