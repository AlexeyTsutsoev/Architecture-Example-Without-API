import { ScaleHookProps } from '../../../hooks/useScale';
import { StyleSheet } from 'react-native';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';
import colors from '../../../utils/theme/colors/colors';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    pressableText: {
      ...globalStyles.buttonText,
      color: colors.errorRed,
      marginLeft: scale.scaleWidth(10),
    },
    pressableContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: scale.scaleHeight(10),
      marginTop: scale.scaleHeight(10),
    },
    pressedContainer: {
      opacity: 0.5,
    },
  });

export default styles;
