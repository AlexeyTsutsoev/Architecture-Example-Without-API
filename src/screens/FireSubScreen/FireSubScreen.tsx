import React, { FC, useMemo } from 'react';
import { Text, View } from 'react-native';

import BigButton from '../../components/buttons/BigButton/BigButton';
import ImagedHeader from '../../components/UIComponents/ImagedHeader/ImagedHeader';

import useScale from '../../hooks/useScale';
import styles from './FireSubScreen.style';

const pathToImage = require('../../assets/pngs/fire_header.png');

const FireSubScreen: FC = () => {
  // style
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  return (
    <View style={stylesWithProps.container}>
      <ImagedHeader title="Fire Bundle" image={pathToImage} />
      <View style={stylesWithProps.mainContent}>
        <View>
          <Text style={stylesWithProps.title}>FREE!</Text>
          <Text style={stylesWithProps.subTitle}>Subscribtion offer</Text>
          <Text style={stylesWithProps.text}>
            Customise your website link and add edit the colour of your mirror.
          </Text>
        </View>
        <BigButton title="Unsubscribe" onPress={() => null} type="red" />
      </View>
    </View>
  );
};

export default FireSubScreen;
