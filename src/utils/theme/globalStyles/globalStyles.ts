import { StyleSheet } from 'react-native';
import scale, { deviceHeight, deviceWidth } from '../../scale/scale';
import colors from '../colors/colors';

const globalStyles = StyleSheet.create({
  MainContainer: {
    height: deviceHeight(),
    width: deviceWidth(),
    backgroundColor: colors.mainBackground,
  },
  container: {
    width: '100%',
    height: '100%',
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.mainBackground,
    zIndex: 1,
  },
  scrollContainer: {
    width: '100%',
    height: '100%',
    padding: 20,
    backgroundColor: colors.mainBackground,
    zIndex: 1,
  },
  mainContent: {
    width: '100%',
    height: scale.isIOS ? deviceHeight() * 0.77 : deviceHeight() * 0.78,
  },
  bottomContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: scale.isIOS ? deviceHeight() * 0.1 : deviceHeight() * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainerWithText: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: scale.isIOS ? deviceHeight() * 0.14 : deviceHeight() * 0.2,
    alignItems: 'center',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pageName: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 21,
    color: colors.main,
  },
  h1: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 30,
    lineHeight: 36,
    color: colors.main,
  },
  inputText: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    color: colors.main,
  },
  primaryText: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 18,
    color: colors.main,
  },
  small: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 14,
    color: colors.lightGray,
  },
  error: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 12,
    color: colors.errorRed,
  },
  buttonText: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    color: colors.main,
  },
  bubleText: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14,
    color: colors.main,
  },
});

export default globalStyles;
