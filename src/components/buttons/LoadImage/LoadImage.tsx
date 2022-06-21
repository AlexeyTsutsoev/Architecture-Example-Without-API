import React, { FC, useMemo } from 'react';
import { ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useScale from '../../../hooks/useScale';

import CameraIcon from '../../../assets/svgs/ModalIcons/CameraIcon.svg';
import styles from './LoadImage.style';
import CustomLoader from '../../CustomLoader/CustomLoader';

type Props = {
  imageUri?: string;
  showLoader: boolean;
  onPress: () => void;
};

const LoadImage: FC<Props> = ({ imageUri, showLoader, onPress }) => {
  // styles
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  return (
    <TouchableOpacity onPress={onPress} style={stylesWithProps.container}>
      {imageUri ? (
        <ImageBackground
          resizeMode="contain"
          source={{ uri: imageUri }}
          style={[
            stylesWithProps.imageContainer,
            showLoader && stylesWithProps.imageLoad,
          ]}>
          {showLoader && <CustomLoader />}
        </ImageBackground>
      ) : (
        <CameraIcon />
      )}
    </TouchableOpacity>
  );
};

export default LoadImage;
