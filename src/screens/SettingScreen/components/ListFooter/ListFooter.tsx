import React, { FC } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import BigButton, {
  ButtonProps,
} from '../../../../components/buttons/BigButton/BigButton';
import styles from './ListFooter.style';

type Props = {
  items: ButtonProps[];
};

const ListFooter: FC<Props> = ({ items }) => {
  const renderItem = ({ item }: ListRenderItemInfo<ButtonProps>) => {
    return (
      <BigButton type={item.type} title={item.title} onPress={item.onPress} />
    );
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listWrapperStyle}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      scrollEnabled={false}
      data={items}
      renderItem={renderItem}
    />
  );
};

export default ListFooter;
