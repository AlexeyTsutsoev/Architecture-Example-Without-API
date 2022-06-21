import React, { FC, useMemo } from 'react';
import { Image, Text, View } from 'react-native';
import useScale from '../../../hooks/useScale';
import styles from './Tab.style';

type Props = {
  title: string;
  description: string;
};

const Tab: FC<Props> = ({ title, description }) => {
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  return (
    <View style={stylesWithProps.container}>
      <View style={stylesWithProps.imageWrapper}>
        <Image source={require('../../../assets/pngs/tutorial_photo.png')} />
      </View>
      <Text style={stylesWithProps.title}>{title}</Text>
      <Text style={stylesWithProps.description}>{description}</Text>
    </View>
  );
};

export default Tab;
