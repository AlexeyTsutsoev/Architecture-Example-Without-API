import React, { FC } from 'react';
import { Alert, Text, View } from 'react-native';

import BigButton from '../../components/buttons/BigButton/BigButton';

import PaymentFailedIcon from '../../assets/svgs/subscriptionIcon/PaymentFailedIcon.svg';
import styles from './PaymentFailedScreen.style';
import { StackNavigationProp } from '@react-navigation/stack';
import { StoreStackParamList } from '../../navigation/StoreNavigation/StoreNavigation';
import { useNavigation } from '@react-navigation/core';

type NavigationProp = StackNavigationProp<
  StoreStackParamList,
  'PaymentFailedScreen'
>;

const PaymentFailedScreen: FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const onTryAgain = () => {
    Alert.alert('Work in progress');
  };

  const onChangePayment = () => {
    navigation.goBack();
  };

  const onCancel = () => {
    navigation.navigate('PowerUpScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.title}>Payment failed!</Text>
        <Text style={styles.subTitle}>
          Something went wrong. But don’t worry and try one of options below.
        </Text>
      </View>
      <PaymentFailedIcon />
      <View style={[styles.item, styles.btnContainer]}>
        <BigButton title="Try again >" onPress={onTryAgain} />
        <BigButton title="< Change payment method" onPress={onChangePayment} />
        <BigButton title="Cancel purchase" onPress={onCancel} type="red" />
      </View>
    </View>
  );
};

export default PaymentFailedScreen;
