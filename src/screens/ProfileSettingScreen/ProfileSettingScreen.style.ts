import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../hooks/useScale';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = ({ deviceHeight }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      ...globalStyles.container,
    },
    scroll: {
      width: '100%',
    },
    scrollContainer: {
      width: '100%',
      height: deviceHeight * 0.6,
    },
    bottomContainer: {
      ...globalStyles.bottomContainer,
    },
    toastStyle: {
      zIndex: 5,
    },
  });

export default styles;
