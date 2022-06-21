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
      zIndex: 1,
    },
    mainStyle: {
      width: '100%',
      backgroundColor: colors.inputBackground,
      height: scaleHeight(60),
      paddingHorizontal: 10,
      marginVertical: scaleHeight(10),
      borderWidth: 0,
      borderRadius: 0,
      borderBottomWidth: 2,
      minHeight: scaleHeight(60),
    },
    dropdownStyle: {
      backgroundColor: colors.inputBackground,
      borderColor: colors.lightGray,
      borderRadius: 0,
      marginTop: scaleHeight(15),
    },
    focusedInput: {
      borderBottomColor: colors.blueLink,
    },
    errorInput: {
      borderBottomColor: colors.errorRed,
    },
    title: {
      ...globalStyles.primaryText,
    },
    focusedTitle: {
      color: colors.blueLink,
    },
    errorText: {
      color: colors.errorRed,
    },
  });

export default styles;
