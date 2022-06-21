import { StyleSheet } from 'react-native';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';
import colors from '../../../utils/theme/colors/colors';
import { ScaleHookProps } from '../../../hooks/useScale';

const styles = ({ scaleHeight, scaleWidth }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginBottom: scaleHeight(25),
      maxHeight: scaleHeight(200),
    },
    inputStyle: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.inputBackground,
      borderBottomWidth: 2,
      borderBottomColor: colors.main,
    },
    input: {
      ...globalStyles.inputText,
      paddingVertical: scaleHeight(20),
      paddingHorizontal: 10,
      flex: 1,
    },
    focusedInput: {
      borderBottomColor: colors.blueLink,
    },
    errorInput: {
      borderBottomColor: colors.errorRed,
    },
    titleText: {
      ...globalStyles.primaryText,
    },
    unfocusedTitle: {
      color: colors.main,
    },
    focusedTitle: {
      color: colors.blueLink,
    },
    errorText: {
      color: colors.errorRed,
    },
    accessoryWrapper: {
      marginHorizontal: scaleWidth(10),
    },
  });

export default styles;
