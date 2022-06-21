import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../../hooks/useScale';
import globalStyles from '../../../../utils/theme/globalStyles/globalStyles';
import colors from '../../../../utils/theme/colors/colors';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      width: scale.deviceWidth,
      height: scale.scaleHeight(245),
      paddingHorizontal: scale.scaleWidth(20),
      paddingVertical: scale.scaleHeight(30),
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.mainBackground,
    },
    title: {
      ...globalStyles.h1,
      textAlign: 'center',
    },
    buttonContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

export default styles;
