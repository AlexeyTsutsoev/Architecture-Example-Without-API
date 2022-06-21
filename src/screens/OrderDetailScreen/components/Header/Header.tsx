import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useMemo } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import LinearGradient from 'react-native-linear-gradient';

import BackArrowIcon from '../../../../assets/svgs/general/BackArrowIcon.svg';
import useScale from '../../../../hooks/useScale';
import { OrdresParamList } from '../../../../navigation/OrdersNavigation/OrdersNavigation';
import gradient from '../../../../utils/theme/gradient';
import styles from './Header.style';

type Props = {
  cover: string;
  number: string;
  count: number;
};

type NavigationProps = StackNavigationProp<
  OrdresParamList,
  'OrderDetailScreen'
>;

const Header: FC<Props> = ({ cover, number, count }) => {
  // navigation
  const navigation = useNavigation<NavigationProps>();

  // styles
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  // helpers
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      style={stylesWithProps.container}
      resizeMode="contain"
      source={{ uri: cover }}>
      <View style={stylesWithProps.item}>
        <TouchableOpacity style={stylesWithProps.arrowTouch} onPress={goBack}>
          <BackArrowIcon />
        </TouchableOpacity>
      </View>
      <LinearGradient colors={gradient} style={stylesWithProps.item}>
        <Text style={stylesWithProps.title}>{`Order №${number}`}</Text>
        <Text style={stylesWithProps.subTitle}>{`${count} items`}</Text>
      </LinearGradient>
    </ImageBackground>
  );
};

export default Header;
