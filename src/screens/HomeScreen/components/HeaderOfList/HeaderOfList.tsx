import React, { FC } from 'react';
import { View, Text } from 'react-native';
import PressableText from '../../../../components/buttons/PressableText/PressableText';
import styles from './HeaderOfList.style';

type Props = {
  title: string;
  onPress: () => void;
};

const HeaderOfList: FC<Props> = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <PressableText title="Show all >" onPress={onPress} />
    </View>
  );
};

export default HeaderOfList;
