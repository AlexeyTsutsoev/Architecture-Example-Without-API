import React, { FC, ReactElement, useMemo } from 'react';
import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  Text,
  ViewStyle,
} from 'react-native';
import useScale from '../../../hooks/useScale';
import styles from './BigButton.style';

export type ButtonProps = {
  title: string;
  onPress: () => void;
  type?: 'black' | 'red' | 'disable' | 'secundary';
  accessoryLeft?: () => ReactElement;
  accessoryRigt?: () => ReactElement;
};

const BigButton: FC<ButtonProps> = ({
  title,
  onPress,
  type,
  accessoryLeft,
  accessoryRigt,
}) => {
  const scale = useScale();
  const getStylesWithProps = useMemo(() => styles(scale), [scale]);

  const getType = () => {
    switch (type) {
      case 'black':
        return {
          unpressedStyle: getStylesWithProps.unpressedBlack,
          pressedStyle: getStylesWithProps.pressedBlack,
        };
      case 'red':
        return {
          unpressedStyle: getStylesWithProps.unpressedRed,
          pressedStyle: getStylesWithProps.pressedRed,
        };
      case 'disable':
        return {
          unpressedStyle: getStylesWithProps.disable,
          pressedStyle: getStylesWithProps.disable,
        };
      case 'secundary':
        return {
          unpressedStyle: getStylesWithProps.unpressedSecundary,
          pressedStyle: getStylesWithProps.pressedSecundary,
        };
      default:
        return {
          unpressedStyle: getStylesWithProps.unpressedBlack,
          pressedStyle: getStylesWithProps.pressedBlack,
        };
    }
  };

  const getStyle = ({
    pressed,
  }: PressableStateCallbackType): StyleProp<ViewStyle> => {
    const { unpressedStyle, pressedStyle } = getType();
    const touchStyle = pressed ? pressedStyle : unpressedStyle;
    return [touchStyle, getStylesWithProps.btnContainer];
  };

  const getTextStyle = () => {
    if (type === 'secundary') {
      return getStylesWithProps.btnText;
    }
    return getStylesWithProps.mainColorText;
  };

  return (
    <Pressable style={getStyle} onPress={onPress}>
      {accessoryLeft && accessoryLeft()}
      <Text style={getTextStyle()}>{title}</Text>
      {accessoryRigt && accessoryRigt()}
    </Pressable>
  );
};

export default BigButton;
