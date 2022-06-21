import React, { FC, useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import { ItemType, ValueType } from 'react-native-dropdown-picker';
import useScale from '../../../hooks/useScale';
import LittleBlackButton from '../../buttons/LittleBlackButton/LittleBlackButton';
import LittleRedButton from '../../buttons/LittleRedButton/LittleRedButton';
import CustomLoader from '../../CustomLoader/CustomLoader';
import CustomDropDown from '../../inputs/CustomDropDown/CustomDropDown';
import styles from './EditPriceModal.style';

type Props = {
  initialValue: ValueType;
  price: number;
  onCancel: () => void;
  handleSubmit: (value: number) => Promise<void>;
};

const emptyArray = Array(39).fill({});
const DROPDOWN_ITEMS: ItemType[] = emptyArray.map((_, index) => {
  const value = (index + 2) * 5;
  return { value: value.toString(), label: `${value}%` };
});

const EditPriceModal: FC<Props> = ({
  initialValue,
  price,
  onCancel,
  handleSubmit,
}) => {
  // styles
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  // state
  const [value, setValue] = useState<ValueType>(initialValue.toString());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const totalPrice = useMemo(
    () => (price + (price * parseInt(value.toString(), 10)) / 100).toFixed(2),
    [price, value],
  );

  const totalMargin = useMemo(
    () => (parseInt(totalPrice, 10) - price).toFixed(2),
    [price, totalPrice],
  );

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await handleSubmit(+value);
      onCancel();
    } catch (err: any) {
      console.log('ERROR_FROM_MODAL_EDIT_PRICE_', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={stylesWithProps.container}>
      {isLoading && <CustomLoader />}
      <View style={stylesWithProps.mainContent}>
        <Text style={[stylesWithProps.textMain, stylesWithProps.title]}>
          Edit selling price
        </Text>
        <Text style={[stylesWithProps.textMain, stylesWithProps.subTitle]}>
          {`The supplier price is R${price}. Set your profit margin percentage below. This will show on your mirror.`}
        </Text>
        <CustomDropDown
          modalMode
          items={DROPDOWN_ITEMS}
          value={value}
          setValue={setValue}
          title="Edit profit margin"
        />
        <View style={stylesWithProps.rowContainer}>
          <Text
            style={stylesWithProps.title}>{`Final price: R${totalPrice}`}</Text>
          <Text
            style={
              stylesWithProps.marginText
            }>{`Your margin R${totalMargin}`}</Text>
        </View>
      </View>
      <View style={stylesWithProps.rowContainer}>
        <LittleRedButton title="< Cancel" onPress={onCancel} />
        <LittleBlackButton title="Submit >" onPress={onSubmit} />
      </View>
    </View>
  );
};

export default EditPriceModal;
