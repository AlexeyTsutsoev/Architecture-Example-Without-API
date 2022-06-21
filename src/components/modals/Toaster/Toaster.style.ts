import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../hooks/useScale';
import colors from '../../../utils/theme/colors/colors';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';

const styles = ({ deviceWidth, deviceHeight, scaleHeight }: ScaleHookProps) =>
  StyleSheet.create({
    modal: {
      alignItems: 'center',
      width: deviceWidth,
      height: deviceHeight * 0.9,
    },
    top: {
      justifyContent: 'flex-start',
    },
    bottom: {
      justifyContent: 'flex-end',
    },
    contaner: {
      width: deviceWidth * 0.9,
      backgroundColor: colors.mainBackground,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: scaleHeight(10),
      borderColor: colors.main,
      borderWidth: 1,
      borderLeftWidth: 5,
      marginTop: scaleHeight(30),
    },
    text: {
      ...globalStyles.primaryText,
    },
  });

export default styles;
