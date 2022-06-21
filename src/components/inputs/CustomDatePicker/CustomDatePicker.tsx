import React, { FC, useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import MaskInput, { Masks } from 'react-native-mask-input';
import useScale from '../../../hooks/useScale';

import CalendarIcon from '../../../assets/svgs/general/CalendarIcon.svg';

import colors from '../../../utils/theme/colors/colors';
import styles from './CustomDatePicker.style';

import { MaskArray } from 'react-native-mask-input/lib/typescript/src/formatWithMask.types';

type Props = {
  title: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e: Event) => void;
  onPress?: () => void;
  errorText?: string;
  touched?: boolean;
  mask?: MaskArray | [RegExp];
  placeholder?: string;
};

const CustomDatePicker: FC<Props> = ({
  value,
  title,
  errorText,
  touched,
  onBlur,
  onChangeText,
  onPress,
  mask,
  placeholder,
}) => {
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const additionalStyles = useMemo(() => {
    if (errorText && touched) {
      return {
        input: stylesWithProps.errorInput,
        title: stylesWithProps.errorText,
      };
    }
    if (isFocused) {
      return {
        input: stylesWithProps.focused,
        title: stylesWithProps.focusedTitle,
      };
    }
  }, [errorText, isFocused, touched, stylesWithProps]);

  const focusToggle = () => {
    setIsFocused(true);
  };

  const blurToggle = (e: Event) => {
    onBlur(e);
    setIsFocused(false);
  };

  return (
    <View style={stylesWithProps.container}>
      <Text style={[stylesWithProps.titleText, additionalStyles?.title]}>
        {title}
      </Text>
      <View style={[stylesWithProps.main, additionalStyles?.input]}>
        <MaskInput
          placeholder={placeholder ?? '__/__/____'}
          value={value}
          onChangeText={onChangeText}
          onFocus={focusToggle}
          onBlur={blurToggle}
          mask={mask ?? Masks.DATE_MMDDYYYY}
          accessibilityComponentType={undefined}
          accessibilityTraits={undefined}
          style={stylesWithProps.input}
          keyboardType="numeric"
          returnKeyType="done"
        />
        <Pressable onPress={onPress}>
          <CalendarIcon fill={isFocused ? colors.blueLink : colors.main} />
        </Pressable>
      </View>
      {touched && errorText && (
        <Text style={stylesWithProps.errorText} numberOfLines={1}>
          {errorText}
        </Text>
      )}
    </View>
  );
};

export default CustomDatePicker;
