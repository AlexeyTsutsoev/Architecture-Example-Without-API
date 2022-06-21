import { StyleSheet } from 'react-native';
import colors from '../../utils/theme/colors/colors';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '100%',
  },
  title: {
    ...globalStyles.h1,
    textAlign: 'left',
    marginVertical: 20,
  },
  subtitle: {
    ...globalStyles.primaryText,
    textAlign: 'left',
  },
  bottomText: {
    ...globalStyles.buttonText,
    marginTop: 20,
    width: '100%',
    textAlign: 'center',
  },
  modalContainer: {
    backgroundColor: colors.mainBackground,
    paddingHorizontal: 25,
    paddingVertical: 20,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  modalText: {
    ...globalStyles.inputText,
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default styles;
