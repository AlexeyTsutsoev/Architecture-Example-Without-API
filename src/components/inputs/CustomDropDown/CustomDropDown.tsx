import React, { FC, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import DropDownPicker, {
  ItemType,
  ValueType,
} from 'react-native-dropdown-picker';
import useScale from '../../../hooks/useScale';
import styles from './CustomDropDown.style';

type Props = {
  title: string;
  items: ItemType[];
  value: ValueType | ValueType[];
  setValue:
    | React.Dispatch<React.SetStateAction<ValueType>>
    | React.Dispatch<React.SetStateAction<ValueType[]>>;
  onBlur?: (e: Event) => void;
  errorText?: string;
  touched?: boolean;
  modalMode?: boolean;
  multiple?: boolean;
};

const CustomDropDown: FC<Props> = ({
  title,
  items,
  value,
  setValue,
  errorText,
  touched,
  modalMode,
  multiple,
}) => {
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const additionalStyles = useMemo(() => {
    if (errorText && touched) {
      return {
        input: stylesWithProps.errorInput,
        title: stylesWithProps.errorText,
      };
    }
    if (isOpen) {
      return {
        input: stylesWithProps.focusedInput,
        title: stylesWithProps.focusedTitle,
      };
    }
  }, [errorText, isOpen, touched, stylesWithProps]);

  return (
    <View style={stylesWithProps.container}>
      <Text style={[stylesWithProps.title, additionalStyles?.title]}>
        {title}
      </Text>
      <DropDownPicker
        zIndex={1}
        placeholder=""
        open={isOpen}
        setOpen={setIsOpen}
        items={items}
        value={value}
        setValue={setValue}
        style={[stylesWithProps.mainStyle, additionalStyles?.input]}
        dropDownContainerStyle={stylesWithProps.dropdownStyle}
        textStyle={stylesWithProps.title}
        labelStyle={[stylesWithProps.title, additionalStyles?.title]}
        modalProps={{
          animationType: 'slide',
        }}
        listMode={modalMode || !scale.isIOS ? 'MODAL' : 'SCROLLVIEW'}
        multiple={multiple}
      />
      {touched && errorText && (
        <Text style={stylesWithProps.errorText}>{errorText}</Text>
      )}
    </View>
  );
};

export default CustomDropDown;
