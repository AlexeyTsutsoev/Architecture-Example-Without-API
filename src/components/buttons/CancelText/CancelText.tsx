import React, { FC, useMemo } from 'react';
import { Pressable, PressableStateCallbackType, Text } from 'react-native';
import useScale from '../../../hooks/useScale';
import CloseIcon from '../../../assets/svgs/general/CloseIcon.svg';
import styles from './CancelText.style';

type Props = {
  title: string;
  onPress: () => void;
};
const CancelText: FC<Props> = ({ title, onPress }) => {
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  const getPressedStyle = ({ pressed }: PressableStateCallbackType) => {
    const touched = pressed ? stylesWithProps.pressedContainer : null;
    return [touched, stylesWithProps.pressableContainer];
  };

  return (
    <Pressable onPress={onPress} style={getPressedStyle}>
      <CloseIcon />
      <Text style={stylesWithProps.pressableText}>{title}</Text>
    </Pressable>
  );
};

export default CancelText;
