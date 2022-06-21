import React, { FC, ReactElement } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './PressableTextWithAcc.style';

type Props = {
  title: string;
  Icon: () => ReactElement;
  onPress: () => void;
};

const PressableTextWithAcc: FC<Props> = ({ Icon, onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PressableTextWithAcc;
