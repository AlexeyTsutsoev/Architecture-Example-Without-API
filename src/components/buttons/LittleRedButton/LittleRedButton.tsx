import React, { FC, ReactElement, useMemo } from 'react';
import { Pressable, Text, PressableStateCallbackType } from 'react-native';
import useScale from '../../../hooks/useScale';
import styles from './LittleRedButton.style';

type Props = {
  title: string;
  onPress: () => void;
  accessoryLeft?: () => ReactElement;
  accessoryRigt?: () => ReactElement;
};

const LittleRedButton: FC<Props> = ({
  title,
  onPress,
  accessoryLeft,
  accessoryRigt,
}) => {
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  const getStyle = ({ pressed }: PressableStateCallbackType) => {
    const touchStyle = pressed
      ? stylesWithProps.pressed
      : stylesWithProps.unpressed;
    return [touchStyle, stylesWithProps.btnContainer];
  };

  return (
    <Pressable style={getStyle} onPress={onPress}>
      {accessoryLeft && accessoryLeft()}
      <Text style={stylesWithProps.btnText}>{title}</Text>
      {accessoryRigt && accessoryRigt()}
    </Pressable>
  );
};

export default LittleRedButton;
