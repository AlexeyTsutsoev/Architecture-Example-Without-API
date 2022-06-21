import React, { FC, useMemo } from 'react';
import { View, Text } from 'react-native';

import PressableText from '../../buttons/PressableText/PressableText';
import IconBoxSuccess from '../../../assets/svgs/productsIcons/IconBoxSuccess.svg';
import styles from './SuccessAddedModal.style';
import useScale from '../../../hooks/useScale';

type Props = {
  title: string;
  onPress: () => void;
};

const SuccessAddedModal: FC<Props> = ({ title, onPress }) => {
  // styles
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  return (
    <View style={stylesWithProps.main}>
      <View style={stylesWithProps.container}>
        <IconBoxSuccess />
        <Text style={stylesWithProps.text}>{title}</Text>
        <PressableText title="Open cart" onPress={onPress} />
      </View>
    </View>
  );
};

export default SuccessAddedModal;
