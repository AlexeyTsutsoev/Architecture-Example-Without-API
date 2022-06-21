import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../hooks/useScale';
import colors from '../../utils/theme/colors/colors';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = ({ scaleHeight }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      ...globalStyles.container,
    },
    scrollContainer: {
      backgroundColor: colors.mainBackground,
    },
    title: {
      ...globalStyles.h1,
      width: '100%',
      textAlign: 'left',
      marginBottom: scaleHeight(40),
    },
    description: {
      ...globalStyles.inputText,
      fontWeight: '400',
      width: '100%',
      textAlign: 'left',
    },
  });

export default styles;
