import React, { FC, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  Pressable,
} from 'react-native';
import useScale from '../../../hooks/useScale';
import CheckedCircle from '../../../assets/svgs/general/CheckedCircle.svg';
import UncheckedCircle from '../../../assets/svgs/general/UncheckedCircle.svg';
import styles from './CustomRadioGroup.style';

export type RadioItemType = {
  id: string;
  title: string;
  subTitle?: string;
};

type Props = {
  title?: string;
  items: RadioItemType[];
  selectedItem?: string;
  setSelectedItem: (text: string) => void;
};

const CustomRadioGroup: FC<Props> = ({
  title,
  items,
  selectedItem,
  setSelectedItem,
}) => {
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  const renderItem = ({ item }: ListRenderItemInfo<RadioItemType>) => {
    const isSelected = item.id === selectedItem;

    return (
      <Pressable
        onPress={() => setSelectedItem(item.id)}
        style={stylesWithProps.itemContainer}>
        {isSelected ? <CheckedCircle /> : <UncheckedCircle />}
        <View style={stylesWithProps.textContainer}>
          <Text style={stylesWithProps.itemTitle}>{item.title}</Text>
          {item.subTitle && (
            <Text style={stylesWithProps.itemSubTitle}>{item.subTitle}</Text>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <View style={stylesWithProps.container}>
      <Text style={stylesWithProps.title}>{title}</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={data => data.id}
        data={items}
        renderItem={renderItem}
      />
    </View>
  );
};

export default CustomRadioGroup;
