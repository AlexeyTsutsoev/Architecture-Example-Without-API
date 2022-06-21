import React, { FC, useMemo } from 'react';
import {
  ImageBackground,
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootHomeParamList } from '../../../../navigation/HomeNavigation/HomeNavigation';
import { useNavigation } from '@react-navigation/core';
import { CollectionItemType } from '../../../../redux/collections/reducer';

import useScale from '../../../../hooks/useScale';

import EmptyStar from '../../../../assets/svgs/general/EmptyStar.svg';
import styles from './Collection.style';

type Props = {
  item: CollectionItemType;
  onPress?: (id: string) => void;
};

type NavigationProps = StackNavigationProp<RootHomeParamList, 'HomeScreen'>;

const CollectionItem: FC<Props> = ({ item, onPress }) => {
  // navigation
  const navigation = useNavigation<NavigationProps>();

  const navigateToCollectionProducts = () => {
    navigation.navigate('CollectionProducts', { collection: item });
  };

  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  const pressHandler = () => {
    onPress ? onPress(item.id) : navigateToCollectionProducts();
  };

  const getImage = () => {
    const uri = item.cover_image?.original_url;
    return uri
      ? { uri }
      : require('../../../../assets/pngs/header_placeholder.png');
  };

  const getStyles = ({
    pressed,
  }: PressableStateCallbackType): StyleProp<ViewStyle> => {
    const touchStyle = pressed
      ? stylesWithProps.pressed
      : stylesWithProps.unpressed;
    return [touchStyle, stylesWithProps.container];
  };
  return (
    <Pressable style={getStyles} onPress={pressHandler}>
      <ImageBackground style={stylesWithProps.imageStyle} source={getImage()}>
        <View style={stylesWithProps.starContainer}>
          <Pressable>
            <EmptyStar />
          </Pressable>
        </View>
        <Text style={stylesWithProps.title}>{item.name}</Text>
      </ImageBackground>
    </Pressable>
  );
};

export default CollectionItem;
