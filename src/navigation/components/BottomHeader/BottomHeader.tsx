import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { StackHeaderProps } from '@react-navigation/stack';
import styles from './BottomHeader.style';

type Props = BottomTabHeaderProps | StackHeaderProps;

const BottomHeader: FC<Props> = ({ options }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{options.title?.toUpperCase()}</Text>
    </View>
  );
};

export default BottomHeader;
