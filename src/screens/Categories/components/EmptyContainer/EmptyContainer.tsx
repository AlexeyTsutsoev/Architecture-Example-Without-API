import React, { FC } from 'react';
import { View, Text } from 'react-native';
import EmptyProductIcon from '../../../../assets/svgs/productsIcons/EmptyProductIcon.svg';
import PressableText from '../../../../components/buttons/PressableText/PressableText';
import styles from './EmptyContainer.style';

type Props = {
  onReset: () => void;
};

const EmptyContainer: FC<Props> = ({ onReset }) => {
  return (
    <View style={styles.container}>
      <EmptyProductIcon />
      <Text style={styles.title}>Sorry, we couldn’t find any results.</Text>
      <PressableText title="Reset filters" onPress={onReset} />
    </View>
  );
};

export default EmptyContainer;
