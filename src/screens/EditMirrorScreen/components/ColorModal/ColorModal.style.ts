import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../../hooks/useScale';
import colors from '../../../../utils/theme/colors/colors';
import globalStyles from '../../../../utils/theme/globalStyles/globalStyles';

const styles = ({ deviceHeight, scaleHeight, scaleWidth }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      width: '100%',
      paddingHorizontal: scaleWidth(20),
      paddingVertical: scaleHeight(30),
      backgroundColor: colors.mainBackground,
    },
    titleWrapper: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    mainListWrapper: {
      paddingVertical: scaleHeight(30),
      borderBottomColor: colors.lightGray,
      borderBottomWidth: 0.5,
    },
    ball: {
      width: 30,
      height: 30,
      borderRadius: 50,
    },
    columnWrapper: {
      justifyContent: 'space-between',
    },
    separator: {
      height: 30,
    },
    bottomContentContainer: {
      width: '100%',
      justifyContent: 'space-between',
      paddingVertical: scaleHeight(30),
    },
    title: {
      ...globalStyles.inputText,
    },
    bottomContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    paletteStyle: {
      height: deviceHeight * 0.3,
    },
  });

export default styles;
