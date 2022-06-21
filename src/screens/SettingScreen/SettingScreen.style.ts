import { StyleSheet } from 'react-native';
import colors from '../../utils/theme/colors/colors';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    justifyContent: 'space-between',
  },
  modalContainer: {
    backgroundColor: colors.mainBackground,
    padding: 20,
    marginHorizontal: 20,
  },
  listWraper: {
    width: '100%',
  },
  listFooterStyle: {
    marginTop: 47,
  },
});

export default styles;
