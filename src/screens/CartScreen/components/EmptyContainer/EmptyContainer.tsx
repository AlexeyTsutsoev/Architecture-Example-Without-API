import React, { FC, useMemo } from 'react';
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { OrdresParamList } from '../../../../navigation/OrdersNavigation/OrdersNavigation';

import useScale from '../../../../hooks/useScale';

import PressableText from '../../../../components/buttons/PressableText/PressableText';
import BigButton from '../../../../components/buttons/BigButton/BigButton';

import EmptyProductIcon from '../../../../assets/svgs/productsIcons/EmptyProductIcon.svg';
import styles from './EmptyContainer.style';

type NavigationProps = StackNavigationProp<OrdresParamList, 'CartScreen'>;

const EmptyContainer: FC = () => {
  // styles
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  // navigation
  const navigation = useNavigation<NavigationProps>();

  const navigateToProductList = () => {
    navigation
      .getParent()
      ?.navigate('HomeNavigator', { screen: 'Categories', params: {} });
  };

  return (
    <View style={stylesWithProps.container}>
      <View style={stylesWithProps.item}>
        <Text style={stylesWithProps.title}>
          You have to make an order first!
        </Text>
        <Text style={stylesWithProps.subTitle}>
          Track your completed orders from warehouse to customer here.
        </Text>
      </View>
      <EmptyProductIcon />
      <View style={stylesWithProps.item}>
        <BigButton title="Browse products >" onPress={navigateToProductList} />
        <PressableText title="How it works?" onPress={() => null} />
      </View>
    </View>
  );
};

export default EmptyContainer;
