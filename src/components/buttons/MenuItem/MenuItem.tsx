import React, { FC, ReactElement, useMemo } from 'react';
import { View, Text } from 'react-native';
import useScale from '../../../hooks/useScale';
import styles from './MenuItem.style';

type Props = {
  title: string;
  icon?: () => ReactElement;
};

const MenuItem: FC<Props> = ({ title, icon }) => {
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  return (
    <View style={stylesWithProps.popUpItemContainer}>
      {icon && icon()}
      <Text style={stylesWithProps.popUpText}>{title}</Text>
    </View>
  );
};

export default MenuItem;
