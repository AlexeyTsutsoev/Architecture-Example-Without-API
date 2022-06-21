import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../hooks/useScale';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = ({ scaleHeight }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      ...globalStyles.container,
      paddingVertical: scaleHeight(10),
      justifyContent: 'space-between',
    },
    bottomContainer: {
      width: '100%',
      alignItems: 'center',
    },
    textContainer: {
      width: '100%',
    },
    title: {
      ...globalStyles.h1,
      marginBottom: scaleHeight(15),
    },
    subTitle: {
      ...globalStyles.primaryText,
    },
  });

export default styles;
