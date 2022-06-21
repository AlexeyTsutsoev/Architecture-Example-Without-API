import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../hooks/useScale';
import colors from '../../../utils/theme/colors/colors';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';

const styles = ({ deviceWidth, scaleHeight, scaleWidth }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      width: deviceWidth,
      height: deviceWidth,
    },
    conentContainer: {
      width: '100%',
      height: '100%',
    },
    image: {
      flex: 1,
      justifyContent: 'space-between',
      paddingTop: scaleHeight(25),
    },
    gradientContainer: {
      position: 'absolute',
      bottom: 0,
      paddingHorizontal: scaleWidth(20),
      width: '100%',
      height: '30%',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    title: {
      ...globalStyles.h1,
      color: colors.textWhite,
      textAlign: 'left',
    },
    pressableWrapper: {
      position: 'absolute',
      height: 30,
      width: 30,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
    },
    arrowWrapper: {
      top: 20,
      left: 20,
    },
    addRemoveWrapper: {
      top: 20,
      right: 20,
    },
    closeIcon: {
      position: 'absolute',
      top: 20,
      right: 20,
    },
    dotContainer: {
      flexDirection: 'row',
      padding: 20,
      paddingLeft: 0,
    },
    dot: {
      width: 5,
      height: 5,
      borderRadius: 3.5,
      backgroundColor: colors.mainBackground,
      margin: 3,
    },
    selectedDot: {
      width: 15,
      height: 5,
      borderRadius: 3.5,
      backgroundColor: colors.blueLink,
    },
    loadingContainer: {
      position: 'absolute',
      width: deviceWidth,
      height: deviceWidth,
      opacity: 0.5,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default styles;
