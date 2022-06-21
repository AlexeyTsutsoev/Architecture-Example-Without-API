import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../../hooks/useScale';
import globalStyles from '../../../../utils/theme/globalStyles/globalStyles';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: scale.scaleHeight(20),
    },
    pressedContainer: {
      opacity: 0.5,
    },
    title: {
      ...globalStyles.inputText,
      letterSpacing: 0.01,
      width: '88%',
    },
  });

export default styles;
