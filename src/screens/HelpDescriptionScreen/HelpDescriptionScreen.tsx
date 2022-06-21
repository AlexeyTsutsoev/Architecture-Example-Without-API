import { RouteProp, useRoute } from '@react-navigation/core';
import React, { FC, useMemo } from 'react';
import { Text, ScrollView, View } from 'react-native';
import useScale from '../../hooks/useScale';
import { SettingParamList } from '../../navigation/SettingNavigation/SettingNavigation';
import styles from './HelpDescriptionScreen.style';

type SettingRouteProp = RouteProp<SettingParamList, 'HelpDescriptionScreen'>;

const HelpDescriptionScreen: FC = () => {
  //styles
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);
  //route
  const { params } = useRoute<SettingRouteProp>();

  return (
    <ScrollView
      style={stylesWithProps.scrollContainer}
      showsVerticalScrollIndicator={false}>
      <View style={stylesWithProps.container}>
        <Text style={stylesWithProps.title}>{params.item.title}</Text>
        <Text style={stylesWithProps.description}>
          {params.item.description}
        </Text>
      </View>
    </ScrollView>
  );
};

export default HelpDescriptionScreen;
