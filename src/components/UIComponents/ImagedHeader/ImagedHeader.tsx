import React, { FC, useMemo } from 'react';
import { Image, ImageBackground, Pressable, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/core';

import BackArrowIcon from '../../../assets/svgs/general/BackArrowIcon.svg';

import useScale from '../../../hooks/useScale';
import styles from './ImagedHeader.style';
import LinearGradient from 'react-native-linear-gradient';
import gradient from '../../../utils/theme/gradient';

type Props = {
  image: any;
  title: string;
  subTitle?: string;
  isContain?: boolean;
  isHideBackBtn?: boolean;
};

const ImagedHeader: FC<Props> = ({
  image,
  title,
  subTitle,
  isContain,
  isHideBackBtn,
}) => {
  // styles
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  // navigation
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      resizeMode={isContain ? undefined : 'stretch'}
      style={stylesWithProps.imageContainer}
      source={image}
      blurRadius={isContain ? 50 : 0}>
      <View style={stylesWithProps.item}>
        {!isHideBackBtn && (
          <Pressable style={stylesWithProps.pressableWrapper} onPress={goBack}>
            <BackArrowIcon />
          </Pressable>
        )}
      </View>
      {isContain && (
        <Image
          style={stylesWithProps.containImage}
          resizeMode="contain"
          source={image}
        />
      )}
      <LinearGradient colors={gradient} style={stylesWithProps.item}>
        <Text style={stylesWithProps.title}>{title}</Text>
        {subTitle ? (
          <Text style={stylesWithProps.subTitle}>{subTitle}</Text>
        ) : null}
      </LinearGradient>
    </ImageBackground>
  );
};

export default ImagedHeader;
