import { Dimensions, StyleSheet } from 'react-native';
import colors from '../../utils/theme/colors/colors';
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
  scrollContainer: {
    backgroundColor: colors.mainBackground,
  },
  modalContainer: {
    width: '100%',
    height: Dimensions.get('window').height * 0.5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  modalTextContainer: {
    width: '100%',
  },
  modalTitle: {
    ...globalStyles.inputText,
    marginBottom: 10,
  },
  modalSubTitle: {
    ...globalStyles.primaryText,
    fontWeight: '400',
  },
  row: {
    ...globalStyles.row,
  },
});

export default styles;
