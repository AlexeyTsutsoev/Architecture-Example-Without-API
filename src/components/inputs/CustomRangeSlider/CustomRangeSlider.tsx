import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import { View, Text } from 'react-native';
//@ts-ignore-next-line //@TODO: check resolve
import RangeSlider from 'rn-range-slider';
import { useDebouncedCallback } from '../../../../node_modules/use-debounce/lib';
import useScale from '../../../hooks/useScale';
import styles from './CustomRangeSlider.style';

type Props = {
  title: string;
  minValue: number;
  maxValue: number;
  step: number;
  onValueChanged: (low: number, high: number) => void;
  renderLabel: (value: number) => ReactNode;
};

const CustomRangeSlider: FC<Props> = ({
  title,
  minValue,
  maxValue,
  step,
  onValueChanged,
  renderLabel,
}) => {
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  const renderThumb = useCallback(
    () => <View style={stylesWithProps.thumb} />,
    [stylesWithProps],
  );
  const renderRail = useCallback(
    () => <View style={stylesWithProps.rail} />,
    [stylesWithProps],
  );
  const renderRailSelected = useCallback(
    () => <View style={stylesWithProps.selectedRail} />,
    [stylesWithProps],
  );

  const handleValueChange = useDebouncedCallback((low, high) => {
    onValueChanged(low, high);
  }, 500);
  return (
    <View style={stylesWithProps.contaner}>
      <Text style={stylesWithProps.title}>{title}</Text>
      <RangeSlider
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        floatingLabel
        min={minValue}
        max={maxValue}
        step={step}
        onValueChanged={handleValueChange}
      />
    </View>
  );
};

export default CustomRangeSlider;
