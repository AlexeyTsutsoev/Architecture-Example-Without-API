import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../hooks/useScale';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = ({ deviceHeight }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      ...globalStyles.container,
      justifyContent: 'space-between',
    },
    mainContent: {
      width: '100%',
      height: deviceHeight * 0.4,
      justifyContent: 'space-between',
    },
    bottomContainer: {
      width: '100%',
      height: deviceHeight * 0.25,
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
    title: {
      ...globalStyles.h1,
      width: '100%',
      textAlign: 'left',
    },
    bottomText: {
      ...globalStyles.bubleText,
    },
  });

export default styles;
