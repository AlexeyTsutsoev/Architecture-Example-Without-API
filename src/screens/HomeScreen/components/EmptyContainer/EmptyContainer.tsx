import React, { FC, useMemo } from 'react';
import { Text, View } from 'react-native';
import useScale from '../../../../hooks/useScale';
import EmptyProductIcon from '../../../../assets/svgs/productsIcons/EmptyProductIcon.svg';
import styles from './EmptyContainer.style';
import PressableText from '../../../../components/buttons/PressableText/PressableText';

type Props = {
  onPress: () => void;
};

const EmptyContainer: FC<Props> = ({ onPress }) => {
  // style
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  return (
    <View style={stylesWithProps.container}>
      <EmptyProductIcon />
      <Text style={stylesWithProps.title}>Problems with loading products.</Text>
      <PressableText title="Try changing merchant." onPress={onPress} />
    </View>
  );
};

export default EmptyContainer;
