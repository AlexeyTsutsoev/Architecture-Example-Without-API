import React, { FC, ReactElement, useMemo, useState } from 'react';
import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  Text,
  TextInput,
  View,
} from 'react-native';
import MaskInput from 'react-native-mask-input';
import { MaskArray } from 'react-native-mask-input/lib/typescript/src/formatWithMask.types';
import useScale from '../../../hooks/useScale';
import styles from './CustomTextField.style';

type Props = {
  title: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: Event) => void;
  errorText?: string;
  touched?: boolean;
  isSecure?: boolean;
  keyboardType?: KeyboardTypeOptions;
  accessoryLeft?: () => ReactElement;
  accessoryRight?: () => ReactElement;
  multiline?: boolean;
  masked?: boolean;
  mask?: MaskArray;
  returnKeyType?: ReturnKeyTypeOptions;
};

const CustomTextField: FC<Props> = ({
  title,
  value,
  onChangeText,
  onBlur,
  errorText,
  touched,
  isSecure,
  keyboardType,
  accessoryLeft,
  accessoryRight,
  multiline,
  masked,
  mask,
  returnKeyType,
}) => {
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const additionalInputStyles = useMemo(() => {
    if (errorText && touched) {
      return {
        input: stylesWithProps.errorInput,
        title: stylesWithProps.errorText,
      };
    }
    if (isFocused) {
      return {
        input: stylesWithProps.focusedInput,
        title: stylesWithProps.focusedTitle,
      };
    }
  }, [isFocused, errorText, touched, stylesWithProps]);
  const numberOfLines = multiline ? 4 : 1;

  const focusToggle = () => {
    setIsFocused(true);
  };

  const blurToggle = (e: Event) => {
    if (onBlur) {
      onBlur(e);
    }
    setIsFocused(false);
  };

  return (
    <View style={stylesWithProps.container}>
      <Text style={[stylesWithProps.titleText, additionalInputStyles?.title]}>
        {title}
      </Text>
      <View style={[stylesWithProps.inputStyle, additionalInputStyles?.input]}>
        {accessoryLeft && (
          <View style={stylesWithProps.accessoryWrapper}>
            {accessoryLeft()}
          </View>
        )}
        {!masked ? (
          <TextInput
            style={stylesWithProps.input}
            value={value}
            secureTextEntry={isSecure}
            onChangeText={onChangeText}
            onFocus={focusToggle}
            onBlur={blurToggle}
            keyboardType={keyboardType}
            multiline={multiline}
            numberOfLines={numberOfLines}
            autoCapitalize="none"
            returnKeyLabel="Done"
            returnKeyType={returnKeyType}
          />
        ) : (
          <MaskInput
            style={stylesWithProps.input}
            value={value}
            secureTextEntry={isSecure}
            onChangeText={onChangeText}
            onFocus={focusToggle}
            onBlur={blurToggle}
            keyboardType={keyboardType}
            autoCapitalize="none"
            mask={mask}
            accessibilityComponentType={undefined}
            accessibilityTraits={undefined}
          />
        )}
        {accessoryRight && (
          <View style={stylesWithProps.accessoryWrapper}>
            {accessoryRight()}
          </View>
        )}
      </View>
      {touched && errorText && (
        <Text style={stylesWithProps.errorText}>{errorText}</Text>
      )}
    </View>
  );
};

export default CustomTextField;
