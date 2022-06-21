import React, { FC } from 'react';
import { Pressable, Text, View } from 'react-native';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { StackHeaderProps } from '@react-navigation/stack';
import BackArrowIcon from '../../../assets/svgs/general/BackArrowIcon.svg';
import CloseIcon from '../../../assets/svgs/general/CloseIcon.svg';
import styles from './MainHeader.style';

type Props = BottomTabHeaderProps | StackHeaderProps;

const MainHeader: FC<Props> = ({ navigation, options, route }) => {
  const getArrowStyles = () => {
    return !navigation.canGoBack() ? styles.disableIcon : styles.arrowWrapper;
  };

  const getCloseStyles = () => {
    switch (route.name) {
      case 'ProceedScreen':
      case 'PaymentMethodScreen':
        return styles.arrowWrapper;
      default:
        return styles.disableIcon;
    }
  };

  const onClose = () => {
    switch (route.name) {
      case 'ProceedScreen':
        navigation.reset({
          index: 0,
          routes: [{ name: 'CartScreen' }],
        });
        return;
      case 'PaymentMethodScreen':
        navigation.setParams({ showWindow: true });
        return;
      default:
        () => null;
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={getArrowStyles} onPress={navigation.goBack}>
        <BackArrowIcon />
      </Pressable>
      <Text style={styles.title}>{options.title?.toUpperCase()}</Text>
      <Pressable onPress={onClose} style={getCloseStyles}>
        <CloseIcon />
      </Pressable>
    </View>
  );
};

export default MainHeader;
