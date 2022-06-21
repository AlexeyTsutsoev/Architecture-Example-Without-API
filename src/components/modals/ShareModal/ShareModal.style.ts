import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../hooks/useScale';
import colors from '../../../utils/theme/colors/colors';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: colors.mainBackground,
      paddingVertical: scale.scaleHeight(25),
      paddingHorizontal: scale.scaleWidth(20),
    },
    itemContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    titleContainer: {
      marginBottom: scale.scaleHeight(25),
    },
  });

export default styles;
