import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../hooks/useScale';
import colors from '../../../utils/theme/colors/colors';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';

const styles = ({ scaleHeight, scaleWidth }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: scaleHeight(9),
      paddingHorizontal: scaleWidth(10),
      backgroundColor: colors.main,
      borderRadius: 25,
      marginRight: 10,
    },
    pressedContainer: {
      backgroundColor: colors.pressedBlack,
    },
    title: {
      ...globalStyles.small,
      color: colors.textWhite,
      marginRight: 5,
    },
  });

export default styles;
