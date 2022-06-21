import { StyleSheet } from 'react-native';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  mainContent: {
    ...globalStyles.mainContent,
  },
  bottomContainer: {
    ...globalStyles.bottomContainer,
  },
  toastStyle: {
    zIndex: 5,
  },
});

export default styles;
