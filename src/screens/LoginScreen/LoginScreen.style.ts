import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../hooks/useScale';
import colors from '../../utils/theme/colors/colors';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = ({ deviceHeight, scaleHeight }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      ...globalStyles.container,
    },
    mainContent: {
      ...globalStyles.mainContent,
      justifyContent: 'space-between',
    },
    bottomContainer: {
      ...globalStyles.bottomContainerWithText,
    },
    title: {
      ...globalStyles.h1,
      color: colors.main,
      marginBottom: scaleHeight(25),
      width: '100%',
      alignItems: 'flex-start',
    },
    mainText: {
      ...globalStyles.primaryText,
      color: colors.main,
    },
    inviteContainer: {
      width: '100%',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    centeredText: {
      justifyContent: 'center',
    },
    inputsContainer: {
      width: '100%',
      height: deviceHeight * 0.45,
      justifyContent: 'flex-end',
      paddingBottom: scaleHeight(40),
    },
    bottomText: {
      ...globalStyles.buttonText,
      color: colors.main,
      marginTop: scaleHeight(20),
    },
  });

export default styles;
