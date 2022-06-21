import { StyleSheet } from 'react-native';
import colors from '../../../utils/theme/colors/colors';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  safeContainer: {
    width: '100%',
    backgroundColor: colors.mainBackground,
  },
  mainContent: {
    paddingVertical: 30,
  },
  title: {
    ...globalStyles.inputText,
  },
  row: {
    ...globalStyles.row,
  },
  rowItem: {
    width: '47%',
  },
});

export default styles;
