import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text } from 'react-native';

import { useAppSelector } from '../../../redux/store';
import MainModal from '../MainModal/MainModal';
import useScale from '../../../hooks/useScale';
import CustomRadioGroup, {
  RadioItemType,
} from '../../inputs/CustomRadioGroup/CustomRadioGroup';
import CustomRangeSlider from '../../inputs/CustomRangeSlider/CustomRangeSlider';
import LittleRedButton from '../../buttons/LittleRedButton/LittleRedButton';
import LittleBlackButton from '../../buttons/LittleBlackButton/LittleBlackButton';
import BigButton from '../../buttons/BigButton/BigButton';
import PressableText from '../../buttons/PressableText/PressableText';
import styles from './FiltersModal.style';
import CategoryModal from '../CategoryModal/CategoryModal';

type Props = {
  setLow: (low: number) => void;
  setHigh: (lowhigh: number) => void;
  selectedTime?: string;
  radioData: RadioItemType[];
  setSelectedTime: (time: string) => void;
  intermediateCategory: string;
  setIntermediateCategory: (text: string) => void;
  onReset: () => void;
  onCancel: () => void;
  onApply: () => void;
};

const FiltersModal: FC<Props> = ({
  setLow,
  setHigh,
  selectedTime,
  radioData,
  setSelectedTime,
  intermediateCategory,
  setIntermediateCategory,
  onReset,
  onCancel,
  onApply,
}) => {
  //styles
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  //state
  const [isVisible, setVisible] = useState<boolean>(false);
  const [btnTitle, setBtnTitle] = useState('');

  // redux
  const categories = useAppSelector(state => state.products.categories);

  //memoize
  const onSelectItem = useCallback(
    (text: string) => {
      setSelectedTime(text);
    },
    [setSelectedTime],
  );

  // effects
  useEffect(() => {
    if (!intermediateCategory) {
      return;
    }
    const getButtonTitle = (currentId: string) => {
      let name = '';
      const recuring = (id: string) => {
        const current = categories?.allCategories[id];
        name = `${current?.name} / ${name}`;
        if (!current?.parentId) {
          return;
        }
        recuring(current.parentId);
      };
      recuring(currentId);
      return name;
    };
    setBtnTitle(getButtonTitle(intermediateCategory));
  }, [categories?.allCategories, intermediateCategory, setBtnTitle]);

  // functions
  const onChangeValues = (min: number, max: number) => {
    setLow(min);
    setHigh(max);
  };

  const renderLabel = (value: number) => {
    return <Text style={stylesWithProps.rangeTitle}>Less R{value}</Text>;
  };

  const modalToggle = () => {
    setVisible(prev => !prev);
  };

  const cancelCategorues = () => {
    const current = categories?.allCategories[intermediateCategory];
    if (!current) {
      setIntermediateCategory('');
      modalToggle();
      return;
    }
    const parentId = current.parentId;
    const parent = categories?.allCategories[parentId ?? ''];

    if (!parent?.parentId) {
      setIntermediateCategory('');
      return;
    }
    setIntermediateCategory(parent.parentId);
  };

  const radioAction = (text: string) => {
    setIntermediateCategory(text);
  };

  const getButtonText = () => {
    return intermediateCategory ? 'Change Category >' : 'Select Category >';
  };

  return (
    <View style={stylesWithProps.container}>
      <MainModal isVisible={isVisible} type="bottom" onPressOut={modalToggle}>
        <CategoryModal
          intermediateCategory={intermediateCategory}
          modalToggle={modalToggle}
          radioAction={radioAction}
          cancelCategorues={cancelCategorues}
        />
      </MainModal>

      <View style={stylesWithProps.filtersContainer}>
        <View style={stylesWithProps.row}>
          <Text style={stylesWithProps.mainTitle}>Filters</Text>
          <PressableText title="Reset" onPress={onReset} />
        </View>
        <View style={stylesWithProps.btnWrapper}>
          {!!intermediateCategory && (
            <Text style={stylesWithProps.title}>{btnTitle}</Text>
          )}
          <BigButton
            type="secundary"
            title={getButtonText()}
            onPress={modalToggle}
          />
        </View>
        <CustomRadioGroup
          title="Time"
          items={radioData}
          selectedItem={selectedTime}
          setSelectedItem={onSelectItem}
        />
        <CustomRangeSlider
          title="Price"
          step={100}
          minValue={100}
          maxValue={5000}
          onValueChanged={onChangeValues}
          renderLabel={renderLabel}
        />
      </View>
      <View style={stylesWithProps.row}>
        <LittleRedButton title="< Cancel" onPress={onCancel} />
        <LittleBlackButton title="Apply >" onPress={onApply} />
      </View>
    </View>
  );
};

export default FiltersModal;
