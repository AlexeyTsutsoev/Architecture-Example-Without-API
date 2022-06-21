import { StyleSheet } from 'react-native';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';
import colors from '../../../utils/theme/colors/colors';
import { ScaleHookProps } from '../../../hooks/useScale';

const styles = ({ scaleHeight }: ScaleHookProps) =>
  StyleSheet.create({
    btnContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingVertical: scaleHeight(20),
    },
    unpressedBlack: {
      backgroundColor: colors.main,
    },
    pressedBlack: {
      backgroundColor: colors.pressedBlack,
    },
    unpressedRed: {
      backgroundColor: colors.errorRed,
    },
    pressedRed: {
      backgroundColor: colors.pressedRed,
    },
    disable: {
      backgroundColor: colors.lightGray,
    },
    unpressedSecundary: {
      backgroundColor: colors.mainBackground,
      borderWidth: 1,
      borderColor: colors.main,
    },
    pressedSecundary: {
      borderWidth: 1,
      borderColor: colors.pressedBlack,
    },
    btnText: {
      ...globalStyles.buttonText,
    },
    mainColorText: {
      ...globalStyles.buttonText,
      color: colors.textWhite,
    },
  });

export default styles;
