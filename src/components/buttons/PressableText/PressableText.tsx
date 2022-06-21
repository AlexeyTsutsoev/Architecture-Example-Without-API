import React, { FC } from 'react';
import { Pressable, Text, PressableStateCallbackType } from 'react-native';
import styles from './PressableText.style';

type Props = {
  title: string;
  onPress: () => void;
};

const PressableText: FC<Props> = ({ title, onPress }) => {
  const getStyles = ({ pressed }: PressableStateCallbackType) => {
    const touch = pressed ? styles.pressed : null;
    return [styles.general, touch];
  };

  return (
    <Pressable style={getStyles} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default PressableText;
