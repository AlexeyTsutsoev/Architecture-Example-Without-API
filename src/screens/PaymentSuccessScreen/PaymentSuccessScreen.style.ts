import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../hooks/useScale';
import colors from '../../utils/theme/colors/colors';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: colors.mainBackground,
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
    },
    itemContainer: {
      width: '100%',
      alignItems: 'center',
    },
    textContainer: {
      width: '80%',
    },
    bottomContainer: {
      height: scale.deviceHeight * 0.11,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      ...globalStyles.h1,
      marginBottom: scale.scaleHeight(15),
    },
    subTitle: {
      ...globalStyles.primaryText,
      fontWeight: '400',
      textAlign: 'center',
    },
  });

export default styles;
