import { StyleSheet } from 'react-native';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  mainContent: {
    ...globalStyles.mainContent,
    height: '80%',
  },
  bottomContainer: {
    ...globalStyles.bottomContainerWithText,
  },
  row: {
    ...globalStyles.row,
  },
  toastStyle: {
    zIndex: 2,
  },
});

export default styles;
