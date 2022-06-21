import { StyleSheet } from 'react-native';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';
import colors from '../../../utils/theme/colors/colors';
import { ScaleHookProps } from '../../../hooks/useScale';

const styles = ({ scaleWidth }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.mainBackground,
      borderWidth: 1,
      borderColor: colors.lightGray,
    },
    inputStyle: {
      ...globalStyles.inputText,
      flex: 1,
      height: '100%',
      paddingVertical: scaleWidth(20),
    },
    iconStyle: {
      marginHorizontal: scaleWidth(20),
    },
    pressedStyle: {
      opacity: 0.5,
    },
  });

export default styles;
