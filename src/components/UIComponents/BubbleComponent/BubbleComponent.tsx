import React, { FC, useMemo } from 'react';
import { Text, Pressable, PressableStateCallbackType } from 'react-native';
import useScale from '../../../hooks/useScale';
import WhiteCloseIcon from '../../../assets/svgs/general/WhiteCloseIcon.svg';
import styles from './BubbleComponent.style';

type Props = {
  title: string;
  onPress?: () => void;
};

const BubbleComponent: FC<Props> = ({ title, onPress }) => {
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  const getStyles = ({ pressed }: PressableStateCallbackType) => {
    const touch = pressed ? stylesWithProps.pressedContainer : null;
    return [stylesWithProps.container, touch];
  };

  return (
    <Pressable style={getStyles} onPress={onPress}>
      <Text style={stylesWithProps.title}>{title}</Text>
      <WhiteCloseIcon />
    </Pressable>
  );
};

export default BubbleComponent;
