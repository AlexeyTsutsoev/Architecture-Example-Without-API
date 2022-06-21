import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useMemo } from 'react';
import { View, Text } from 'react-native';

import BigButton from '../../components/buttons/BigButton/BigButton';
import ImagedHeader from '../../components/UIComponents/ImagedHeader/ImagedHeader';

import useScale from '../../hooks/useScale';
import { StoreStackParamList } from '../../navigation/StoreNavigation/StoreNavigation';
import styles from './ThunderSubScreen.style';

const imagePath = require('../../assets/pngs/thunder_header.png');

type NavigationProp = StackNavigationProp<
  StoreStackParamList,
  'ThunderSubScreen'
>;

const ThunderSubScreen: FC = () => {
  // style
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  //navigation
  const navigation = useNavigation<NavigationProp>();

  const navigateToPayment = () => {
    navigation.navigate('PaymentMethodScreen', { price: 30 });
  };

  return (
    <View style={stylesWithProps.container}>
      <ImagedHeader title="Thunder Bundle" image={imagePath} />
      <View style={stylesWithProps.mainContent}>
        <View>
          <Text style={stylesWithProps.title}>$30 per month</Text>
          <Text style={stylesWithProps.subTitle}>Subscribtion offer</Text>
          <Text style={stylesWithProps.title}>
            Wholesale Prices - 20% off all products
          </Text>
          <Text style={stylesWithProps.text}>
            Allow your profits to soar with an exclusive 20% off all products in
            the Khoyn catalog!
          </Text>
          <Text style={stylesWithProps.title}>Add your own products</Text>
          <Text style={stylesWithProps.text}>
            Grow your business by selling your own exclusive products directly
            from your Khoyn storefront.
          </Text>
        </View>
        <BigButton title="Pay $30 >" onPress={navigateToPayment} />
      </View>
    </View>
  );
};

export default ThunderSubScreen;
