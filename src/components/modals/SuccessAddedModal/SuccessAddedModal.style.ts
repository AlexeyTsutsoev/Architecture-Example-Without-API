import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../hooks/useScale';
import colors from '../../../utils/theme/colors/colors';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    main: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      width: scale.deviceWidth - 40,
      backgroundColor: colors.mainBackground,
      padding: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      ...globalStyles.inputText,
      textAlign: 'center',
      marginVertical: 15,
    },
  });

export default styles;
