import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../hooks/useScale';
import colors from '../../utils/theme/colors/colors';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = ({ scaleHeight, deviceWidth }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      ...globalStyles.container,
    },
    scrollContainer: {
      width: '100%',
      marginBottom: 20,
    },
    title: {
      ...globalStyles.h1,
      width: '100%',
      textAlign: 'left',
      marginBottom: 15,
    },
    subTitle: {
      ...globalStyles.primaryText,
      fontWeight: '400',
      width: '100%',
      textAlign: 'left',
      marginBottom: scaleHeight(25),
    },
    photoContainer: {
      width: '100%',
      height: deviceWidth,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: colors.lightGray,
      borderWidth: 1,
      marginVertical: scaleHeight(50),
    },
    row: {
      ...globalStyles.row,
    },
    btnWrapper: {
      width: '100%',
      marginBottom: scaleHeight(20),
    },
    sizesWrapper: {
      marginBottom: scaleHeight(10),
    },
  });

export default styles;
