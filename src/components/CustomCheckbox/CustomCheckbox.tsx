import React, { FC, useMemo } from 'react';
import { Pressable, Text } from 'react-native';
import useScale from '../../hooks/useScale';
import CheckCircle from '../../assets/svgs/general/CheckCircle.svg';
import styles from './CustomCheckbox.style';

type Props = {
  onPress: () => void;
  title: string;
  isSelected: boolean;
};

const CustomCheckbox: FC<Props> = ({ onPress, title, isSelected }) => {
  const scale = useScale();
  const styleWithProps = useMemo(() => styles(scale), [scale]);

  return (
    <Pressable
      style={[
        styleWithProps.itemContainer,
        isSelected && styleWithProps.selectedItem,
      ]}
      onPress={onPress}>
      <Text
        style={[
          styleWithProps.itemText,
          isSelected && styleWithProps.selectedText,
        ]}>
        {title}
      </Text>
      <CheckCircle style={!isSelected && styleWithProps.unselectedCheck} />
    </Pressable>
  );
};

export default CustomCheckbox;
