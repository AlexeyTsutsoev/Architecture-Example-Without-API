import { Dimensions, PixelRatio, Platform } from 'react-native';

export const deviceWidth = () => Dimensions.get('window').width;
export const deviceHeight = () => Dimensions.get('window').height;

const isSmallDevice = deviceHeight() < 780;
const isOldDevice = deviceHeight() < 650;
const isBigHeight = deviceHeight() > 900;

const pixelRatioW = PixelRatio.getPixelSizeForLayoutSize(deviceWidth());
const pixelRatioH = PixelRatio.getPixelSizeForLayoutSize(deviceHeight());

const screenSize = Math.sqrt(deviceWidth() * deviceHeight()) / 100;

const layoutWidth = 375;
const layoutHeight = 812;

const layoutScreenSize = Math.sqrt(layoutWidth * layoutHeight) / 100;
const scaleR = (size: number) => (screenSize / layoutScreenSize) * size;
const scaleW = (size: number) => (deviceWidth() / layoutWidth) * size;
const scaleH = (size: number) => (deviceHeight() / layoutHeight) * size;

const isIOS = Platform.OS === 'ios';
const HOME_KEYBOARD_WIDTH = deviceWidth() - 32;

const randomInteger = (min: number, max: number) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const scale = {
  randomInteger,
  width: deviceWidth,
  height: deviceHeight,
  HOME_KEYBOARD_WIDTH,
  scaleW,
  scaleH,
  screenSize,
  isSmallDevice,
  scaleR,
  isOldDevice,
  isBigHeight,
  pixelRatioW,
  pixelRatioH,
  isIOS,
};

export default scale;
