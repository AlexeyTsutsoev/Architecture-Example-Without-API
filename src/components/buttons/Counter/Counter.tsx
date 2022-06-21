import React, { FC, useMemo } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useScale from '../../../hooks/useScale';
import styles from './Counter.style';

type Props = {
  count: number | string;
  increment: () => void;
  decrement: () => void;
};

const Counter: FC<Props> = ({ count, increment, decrement }) => {
  // style
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  return (
    <View style={stylesWithProps.setUpContainer}>
      <TouchableOpacity onPress={decrement} style={stylesWithProps.btnWrapper}>
        <Text>-</Text>
      </TouchableOpacity>
      <Text style={stylesWithProps.countStyle}>{count}</Text>
      <TouchableOpacity onPress={increment} style={stylesWithProps.btnWrapper}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Counter;
