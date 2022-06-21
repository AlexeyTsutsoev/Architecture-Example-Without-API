import React, { FC, useMemo } from 'react';
import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  Text,
  ViewStyle,
} from 'react-native';
import useScale from '../../../hooks/useScale';
import styles from './LittleBlackButton.style';

type Props = {
  title: string;
  onPress: () => void;
};

const LittleBlackButton: FC<Props> = ({ title, onPress }) => {
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  const getStyles = ({
    pressed,
  }: PressableStateCallbackType): StyleProp<ViewStyle> => {
    const touchStyle = pressed
      ? stylesWithProps.pressed
      : stylesWithProps.unpressed;
    return [touchStyle, stylesWithProps.dtnContainer];
  };

  return (
    <Pressable style={getStyles} onPress={onPress}>
      <Text style={stylesWithProps.btnText}>{title}</Text>
    </Pressable>
  );
};

export default LittleBlackButton;
