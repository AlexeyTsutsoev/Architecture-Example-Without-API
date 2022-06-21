import { StyleSheet } from 'react-native';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';
import colors from '../../../utils/theme/colors/colors';
import { ScaleHookProps } from '../../../hooks/useScale';

const styles = ({ scaleHeight, scaleWidth }: ScaleHookProps) =>
  StyleSheet.create({
    btnContainer: {
      flexDirection: 'row',
      width: scaleWidth(155),
      paddingVertical: scaleHeight(20),
      alignItems: 'center',
      justifyContent: 'center',
    },
    pressed: {
      backgroundColor: colors.pressedRed,
    },
    unpressed: {
      backgroundColor: colors.errorRed,
    },
    btnText: {
      ...globalStyles.buttonText,
      color: colors.textWhite,
      marginHorizontal: scaleWidth(10),
    },
  });

export default styles;
