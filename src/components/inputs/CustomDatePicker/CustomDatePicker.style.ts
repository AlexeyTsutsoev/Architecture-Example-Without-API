import { StyleSheet } from 'react-native';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';
import colors from '../../../utils/theme/colors/colors';
import { ScaleHookProps } from '../../../hooks/useScale';

const styles = ({ scaleHeight }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginBottom: scaleHeight(25),
    },
    main: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.inputBackground,
      borderBottomWidth: 2,
      marginVertical: scaleHeight(10),
      borderBottomColor: colors.main,
    },
    focused: {
      borderBottomColor: colors.blueLink,
    },
    focusedTitle: {
      color: colors.blueLink,
    },
    input: {
      ...globalStyles.inputText,
      height: scaleHeight(60),
      paddingHorizontal: 10,
      width: '85%',
    },
    titleText: {
      ...globalStyles.primaryText,
    },
    errorInput: {
      borderBottomColor: colors.errorRed,
    },
    errorText: {
      color: colors.errorRed,
    },
  });

export default styles;
