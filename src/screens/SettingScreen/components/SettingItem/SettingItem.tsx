import React, { FC, ReactElement, useMemo } from 'react';
import { Pressable, PressableStateCallbackType, Text } from 'react-native';
import useScale from '../../../../hooks/useScale';
import styles from './SettingItem.style';

type Props = {
  title: string;
  Icon: () => ReactElement;
  onPress: () => void;
};

const SettingItem: FC<Props> = ({ title, Icon, onPress }) => {
  const scale = useScale();
  const styleWithProps = useMemo(() => styles(scale), [scale]);

  const getStyles = ({ pressed }: PressableStateCallbackType) => {
    const touch = pressed ? styleWithProps.pressedContainer : null;

    return [styleWithProps.container, touch];
  };

  return (
    <Pressable style={getStyles} onPress={onPress}>
      <Icon />
      <Text style={styleWithProps.title}>{title}</Text>
    </Pressable>
  );
};

export default SettingItem;
