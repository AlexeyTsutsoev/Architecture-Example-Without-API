import React, { FC, useMemo, useState } from 'react';
import { Image, Text, View } from 'react-native';
import Counter from '../../../../components/buttons/Counter/Counter';
import PressableText from '../../../../components/buttons/PressableText/PressableText';
import useScale from '../../../../hooks/useScale';
import styles from './ProductItem.style';

type Props = {
  cover?: string;
  name?: string;
  price?: string;
  count?: number;
  totalPrice?: string;
  isComplete?: boolean;
  onPress: () => void;
};

const ProductItem: FC<Props> = ({
  cover,
  name,
  price,
  count,
  totalPrice,
  isComplete,
  onPress,
}) => {
  // style
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  //mock state
  const [stateCount, setStateCount] = useState<number>(count ?? 0);

  const increment = () => {
    setStateCount(prev => ++prev);
  };

  const decrement = () => {
    setStateCount(prev => --prev);
  };

  return (
    <View style={stylesWithProps.container}>
      <Image
        resizeMode="contain"
        style={stylesWithProps.item}
        source={{ uri: cover }}
      />
      <View style={[stylesWithProps.item, stylesWithProps.info]}>
        <View>
          <Text style={stylesWithProps.title}>{name}</Text>
          <Text
            style={
              stylesWithProps.sum
            }>{`${price} x ${count} = ${totalPrice}`}</Text>
          <PressableText onPress={onPress} title="Show details >" />
        </View>
        {isComplete ? (
          <Text style={stylesWithProps.marginStyle}>Your margin $27</Text>
        ) : (
          <Counter
            increment={increment}
            decrement={decrement}
            count={stateCount}
          />
        )}
      </View>
    </View>
  );
};

export default ProductItem;
