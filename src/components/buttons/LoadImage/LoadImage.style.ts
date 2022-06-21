import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../hooks/useScale';
import colors from '../../../utils/theme/colors/colors';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: scale.deviceWidth,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: colors.lightGray,
      borderWidth: 1,
    },
    imageContainer: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    imageLoad: {
      opacity: 0.5,
    },
  });

export default styles;
