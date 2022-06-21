import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../hooks/useScale';
import colors from '../../../utils/theme/colors/colors';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';

const styles = ({ deviceWidth, scaleHeight }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      width: deviceWidth,
      backgroundColor: colors.mainBackground,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: scaleHeight(20),
      borderBottomColor: colors.headerBorder,
      borderBottomWidth: 1,
    },
    title: {
      ...globalStyles.pageName,
      textAlign: 'center',
    },
    menuWrapper: {
      position: 'absolute',
      right: 20,
    },
    dotsWrapper: {
      height: 30,
      width: 30,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
  });

export default styles;
