import React, { FC, useMemo } from 'react';
import { View, Text } from 'react-native';
import SplashLogo from '../../assets/svgs/general/SplashLogo.svg';
import styles from './SplashScreen.style';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import useScale from '../../hooks/useScale';

const SplashScreen: FC = () => {
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  return (
    <View style={stylesWithProps.container}>
      <View style={stylesWithProps.content}>
        <SplashLogo style={stylesWithProps.logosStyle} />
        <Text style={stylesWithProps.text}>Influencer Commerce</Text>
        <CustomLoader />
      </View>
    </View>
  );
};

export default SplashScreen;
