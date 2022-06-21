import React, { FC, useMemo } from 'react';
import {
  Pressable,
  TextInput,
  View,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import useScale from '../../../hooks/useScale';
import colors from '../../../utils/theme/colors/colors';
import SearchAccessory from '../../../assets/svgs/general/SearchAccessory.svg';
import SettingAccesory from '../../../assets/svgs/general/SettingAccesory.svg';
import styles from './CustomSearchInput.style';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  accessoryRight?: boolean;
  onPressAccessory?: () => void;
  onSubmitEditing?: () => void;
};

const CustomSearchInput: FC<Props> = ({
  value,
  onChangeText,
  accessoryRight,
  onPressAccessory,
  onSubmitEditing,
}) => {
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  const getStyle = ({
    pressed,
  }: PressableStateCallbackType): StyleProp<ViewStyle> => {
    const touchStyle = pressed && stylesWithProps.pressedStyle;
    return [stylesWithProps.iconStyle, touchStyle];
  };

  return (
    <View style={stylesWithProps.container}>
      <SearchAccessory style={stylesWithProps.iconStyle} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search..."
        placeholderTextColor={colors.lightGray}
        style={stylesWithProps.inputStyle}
        maxLength={50}
        onBlur={onSubmitEditing}
      />
      {accessoryRight && (
        <Pressable style={getStyle} onPress={onPressAccessory}>
          <SettingAccesory />
        </Pressable>
      )}
    </View>
  );
};

export default CustomSearchInput;
