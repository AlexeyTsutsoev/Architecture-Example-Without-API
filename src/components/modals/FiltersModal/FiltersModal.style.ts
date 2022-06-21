import { StyleSheet } from 'react-native';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';
import colors from '../../../utils/theme/colors/colors';
import { ScaleHookProps } from '../../../hooks/useScale';

const styles = ({ scaleHeight, scaleWidth, deviceHeight }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.mainBackground,
      paddingHorizontal: 20,
      paddingVertical: 30,
      zIndex: 1,
    },
    filtersContainer: {
      marginBottom: scaleHeight(50),
      zIndex: 1,
    },
    mainTitle: {
      ...globalStyles.inputText,
    },
    subTitle: {
      ...globalStyles.primaryText,
    },
    rangeTitle: {
      ...globalStyles.primaryText,
      color: colors.blueLink,
    },
    row: {
      ...globalStyles.row,
    },
    btnWrapper: {
      marginVertical: scaleHeight(25),
    },
    modalContainer: {
      backgroundColor: colors.mainBackground,
      height: deviceHeight * 0.9,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: scaleHeight(30),
      paddingHorizontal: scaleWidth(20),
    },
    mainContent: {
      width: '100%',
      height: '80%',
    },
    btnContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      ...globalStyles.inputText,
      color: colors.lightGray,
      marginVertical: scaleHeight(10),
    },
  });

export default styles;
