import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useMemo } from 'react';
import { Text, View } from 'react-native';
import PaymentSuccess from '../../assets/svgs/subscriptionIcon/PaymentSuccess.svg';
import BigButton from '../../components/buttons/BigButton/BigButton';
import PressableText from '../../components/buttons/PressableText/PressableText';
import useScale from '../../hooks/useScale';
import { StoreStackParamList } from '../../navigation/StoreNavigation/StoreNavigation';
import styles from './PaymentSuccessScreen.style';

type NavigationProp = StackNavigationProp<
  StoreStackParamList,
  'PaymentSuccessScreen'
>;

const PaymentSuccessScreen: FC = () => {
  // navigation
  const navigation = useNavigation<NavigationProp>();

  const resetToMyStore = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'ProfileScreen' }],
    });
  };

  const resetToPiwerUp = () => {
    navigation.navigate('PowerUpScreen');
  };

  // style
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  return (
    <View style={stylesWithProps.container}>
      <View
        style={[stylesWithProps.itemContainer, stylesWithProps.textContainer]}>
        <Text style={stylesWithProps.title}>Payment success!</Text>
        <Text style={stylesWithProps.subTitle}>
          Your payment process has been completed successfully. You can use
          Thunder Bundle subscribtion from now on!
        </Text>
      </View>
      <PaymentSuccess />
      <View
        style={[
          stylesWithProps.bottomContainer,
          stylesWithProps.itemContainer,
        ]}>
        <BigButton title="Open My store >" onPress={resetToMyStore} />
        <PressableText title="Return to Power Up" onPress={resetToPiwerUp} />
      </View>
    </View>
  );
};

export default PaymentSuccessScreen;
