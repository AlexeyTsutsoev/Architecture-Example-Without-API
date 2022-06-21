import React, { FC, useMemo, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  Text,
  ViewStyle,
} from 'react-native';
import { View } from 'react-native-animatable';
import { ColorPicker, fromHsv } from 'react-native-color-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LittleBlackButton from '../../../../components/buttons/LittleBlackButton/LittleBlackButton';
import LittleRedButton from '../../../../components/buttons/LittleRedButton/LittleRedButton';
import PressableText from '../../../../components/buttons/PressableText/PressableText';
import useScale from '../../../../hooks/useScale';
import styles from './ColorModal.style';

const colors = [
  '#FF3131',
  '#FF3162',
  '#FF31AD',
  '#B131FF',
  '#7F31FF',
  '#4E31FF',
  '#315EFF',
  '#319CFF',
  '#31CEFF',
  '#19DAAC',
  '#03CE6C',
  '#216628',
  '#66AB0E',
  '#E7C200',
  '#E78B00',
];

const selectedColorOpacity = [0.2, 0.4, 0.6, 0.8, 1];

type Props = {
  selectedColor: string;
  setSelected: (color: string) => void;
  startColor?: string;
  modalToggle: () => void;
};

const ColorModal: FC<Props> = ({
  selectedColor,
  setSelected,
  modalToggle,
  startColor,
}) => {
  //state
  const [isShowWheel, setShowWheel] = useState<boolean>(false);

  //style
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  // toggle
  const wheelToggle = () => {
    setShowWheel(prev => !prev);
  };

  // styles
  const getStyles = (color: string): ViewStyle[] => {
    return [stylesWithProps.ball, { backgroundColor: color }];
  };

  const getOpacityStyles = (opacity: number): ViewStyle[] => {
    return [stylesWithProps.ball, { backgroundColor: selectedColor, opacity }];
  };

  //render items
  const renderMainItem = ({ item }: ListRenderItemInfo<string>) => {
    return (
      <Pressable onPress={() => setSelected(item)} style={getStyles(item)} />
    );
  };

  const renderBottomItem = ({ item }: ListRenderItemInfo<number>) => {
    return <TouchableOpacity style={getOpacityStyles(item)} />;
  };

  const onBack = () => {
    setSelected(startColor ?? '');
    modalToggle();
  };

  const onAdd = () => {
    modalToggle();
  };

  return (
    <View style={stylesWithProps.container}>
      <View style={stylesWithProps.titleWrapper}>
        <Text style={stylesWithProps.title}>Select a colour</Text>
        <PressableText
          title={isShowWheel ? 'Colour presets' : 'Custom colour >'}
          onPress={wheelToggle}
        />
      </View>
      {isShowWheel ? (
        <ColorPicker
          style={stylesWithProps.paletteStyle}
          defaultColor={selectedColor}
          onColorChange={color => setSelected(fromHsv(color))}
        />
      ) : (
        <View>
          <View style={stylesWithProps.mainListWrapper}>
            <FlatList
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={stylesWithProps.columnWrapper}
              ItemSeparatorComponent={() => (
                <View style={stylesWithProps.separator} />
              )}
              data={colors}
              renderItem={renderMainItem}
              numColumns={5}
            />
          </View>
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={selectedColorOpacity}
              renderItem={renderBottomItem}
              contentContainerStyle={stylesWithProps.bottomContentContainer}
              horizontal
            />
          </View>
        </View>
      )}
      <View style={stylesWithProps.bottomContainer}>
        <LittleRedButton title="< Back" onPress={onBack} />
        <LittleBlackButton title="Add >" onPress={onAdd} />
      </View>
    </View>
  );
};

export default ColorModal;
