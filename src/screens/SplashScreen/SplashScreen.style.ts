import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../hooks/useScale';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = ({ deviceHeight, scaleHeight }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      ...globalStyles.container,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logosStyle: {
      marginBottom: scaleHeight(15),
    },
    text: {
      ...globalStyles.inputText,
    },
    content: {
      height: deviceHeight * 0.2,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
  });

export default styles;
