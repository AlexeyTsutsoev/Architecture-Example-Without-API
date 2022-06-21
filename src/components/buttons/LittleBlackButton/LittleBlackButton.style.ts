import { StyleSheet } from 'react-native';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';
import colors from '../../../utils/theme/colors/colors';
import { ScaleHookProps } from '../../../hooks/useScale';

const styles = ({ scaleWidth, scaleHeight }: ScaleHookProps) =>
  StyleSheet.create({
    dtnContainer: {
      width: scaleWidth(155),
      paddingVertical: scaleHeight(20),
      alignItems: 'center',
      justifyContent: 'center',
    },
    pressed: {
      backgroundColor: colors.pressedBlack,
    },
    unpressed: {
      backgroundColor: colors.main,
    },
    btnText: {
      ...globalStyles.buttonText,
      color: colors.textWhite,
    },
  });

export default styles;
