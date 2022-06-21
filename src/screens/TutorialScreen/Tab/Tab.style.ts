import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../hooks/useScale';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';

const styles = ({ scaleHeight }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
      paddingVertical: scaleHeight(20),
      height: '100%',
      marginBottom: 5,
    },
    title: {
      ...globalStyles.h1,
      textAlign: 'center',
      width: '80%',
      marginBottom: scaleHeight(10),
    },
    description: {
      ...globalStyles.primaryText,
      textAlign: 'center',
      width: '90%',
    },
    imageWrapper: {
      width: '100%',
      marginVertical: scaleHeight(30),
      alignItems: 'center',
    },
  });

export default styles;
