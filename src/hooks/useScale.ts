import { useCallback } from 'react';
import { Platform, useWindowDimensions } from 'react-native';

export type ScaleHookProps = {
  LAYOUT_HEIGHT: number;
  LAYOUT_WIDTH: number;
  isIOS: boolean;
  deviceWidth: number;
  deviceHeight: number;
  scaleWidth: (size: number) => number;
  scaleHeight: (size: number) => number;
  randomInteger: (min: number, max: number) => number;
};

const useScale = () => {
  const LAYOUT_WIDTH = 375;
  const LAYOUT_HEIGHT = 812;
  const isIOS = Platform.OS === 'ios';

  const deviceWidth = useWindowDimensions().width;
  const deviceHeight = useWindowDimensions().height;

  const scaleWidth = useCallback(
    (size: number) => (deviceWidth / LAYOUT_WIDTH) * size,
    [deviceWidth],
  );
  const scaleHeight = useCallback(
    (size: number) => (deviceHeight / LAYOUT_HEIGHT) * size,
    [deviceHeight],
  );

  const randomInteger = (min: number, max: number) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  return {
    LAYOUT_HEIGHT,
    LAYOUT_WIDTH,
    isIOS,
    deviceWidth,
    deviceHeight,
    scaleWidth,
    scaleHeight,
    randomInteger,
  };
};

export default useScale;
