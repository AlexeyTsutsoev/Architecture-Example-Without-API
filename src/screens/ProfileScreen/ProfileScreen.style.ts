import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../hooks/useScale';
import colors from '../../utils/theme/colors/colors';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      width: scale.deviceWidth,
      height: '100%',
      paddingHorizontal: scale.scaleWidth(20),
      backgroundColor: colors.mainBackground,
    },
    listContainer: {
      width: '100%',
    },
  });

export default styles;
