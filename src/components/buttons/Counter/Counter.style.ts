import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../hooks/useScale';
import colors from '../../../utils/theme/colors/colors';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    setUpContainer: {
      width: '75%',
      height: scale.scaleHeight(33),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    btnWrapper: {
      width: scale.scaleWidth(33),
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0.5,
      borderColor: colors.lightGray,
    },
    countStyle: {
      ...globalStyles.bubleText,
      textAlign: 'center',
    },
  });

export default styles;
