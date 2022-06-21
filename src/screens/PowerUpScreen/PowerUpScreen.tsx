import React, { FC, useMemo } from 'react';
import {
  Pressable,
  PressableStateCallbackType,
  Text,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { StoreStackParamList } from '../../navigation/StoreNavigation/StoreNavigation';

import BigButton from '../../components/buttons/BigButton/BigButton';

import FireIcon from '../../assets/svgs/subscriptionIcon/FireIcon.svg';
import ThunderIcon from '../../assets/svgs/subscriptionIcon/ThunderIcon.svg';

import useScale from '../../hooks/useScale';
import styles from './PowerUpScreen.style';

type NavigationProps = StackNavigationProp<
  StoreStackParamList,
  'PowerUpScreen'
>;

const PowerUpScreen: FC = () => {
  // styles
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  const getStyles = ({ pressed }: PressableStateCallbackType) => {
    const touch = pressed ? stylesWithProps.touchedRow : null;
    return [stylesWithProps.row, touch];
  };

  // navigation
  const navigation = useNavigation<NavigationProps>();

  const navigateToFire = () => {
    navigation.navigate('FireSubScreen');
  };

  const navigateToThunder = () => {
    navigation.navigate('ThunderSubScreen');
  };

  return (
    <View style={stylesWithProps.container}>
      <Text style={stylesWithProps.title}>Power Up</Text>
      <Text style={stylesWithProps.subTitle}>
        Add some style and spice to your mirror with these juicy upgrades.
      </Text>
      <View style={stylesWithProps.subItem}>
        <Pressable onPress={navigateToFire} style={getStyles}>
          <FireIcon style={stylesWithProps.iconStyle} />
          <View style={stylesWithProps.subTextContainer}>
            <Text style={stylesWithProps.subTextTitle}>Fire Bundle</Text>
            <Text style={stylesWithProps.subTextsubTitle}>
              Customise your website link and add edit the colour of your
              mirror.
            </Text>
          </View>
        </Pressable>
        <BigButton type="red" title="Unsubscribe" onPress={() => null} />
      </View>
      <View style={stylesWithProps.subItem}>
        <Pressable onPress={navigateToThunder} style={getStyles}>
          <ThunderIcon style={stylesWithProps.iconStyle} />
          <View style={stylesWithProps.subTextContainer}>
            <Text style={stylesWithProps.subTextTitle}>Thunder Bundle</Text>
            <Text style={stylesWithProps.subTextPrice}>$30 per month</Text>
            <Text style={stylesWithProps.subTextsubTitle}>
              Add your own products to your store and get a catalog wide 20%
              discount on all products. Coming soon!
            </Text>
          </View>
        </Pressable>
        <BigButton title="Subscribe >" onPress={() => null} />
      </View>
    </View>
  );
};

export default PowerUpScreen;
