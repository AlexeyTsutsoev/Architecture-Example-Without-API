import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../hooks/useScale';
import colors from '../../utils/theme/colors/colors';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      ...globalStyles.container,
    },
    title: {
      ...globalStyles.h1,
      width: '100%',
      textAlign: 'left',
      marginBottom: scale.scaleHeight(15),
    },
    subTitle: {
      ...globalStyles.primaryText,
      fontWeight: '400',
      width: '100%',
      textAlign: 'left',
      marginBottom: scale.scaleHeight(30),
    },
    subItem: {
      width: '100%',
      marginBottom: scale.scaleHeight(40),
    },
    row: {
      ...globalStyles.row,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginBottom: scale.scaleHeight(15),
    },
    touchedRow: {
      backgroundColor: colors.lightGray,
      opacity: 0.5,
    },
    iconStyle: {
      marginRight: scale.scaleWidth(15),
    },
    subTextContainer: {
      width: '80%',
    },
    subTextTitle: {
      ...globalStyles.inputText,
      marginBottom: scale.scaleHeight(5),
    },
    subTextsubTitle: {
      ...globalStyles.buttonText,
      fontWeight: '400',
      width: '100%',
      textAlign: 'left',
    },
    subTextPrice: {
      ...globalStyles.buttonText,
      color: colors.lightGray,
      marginBottom: scale.scaleHeight(5),
    },
  });

export default styles;
