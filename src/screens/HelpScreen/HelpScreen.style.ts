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
    ...globalStyles.bottomContainerWithText,
  },
  itemConteiner: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  itemText: {
    ...globalStyles.inputText,
  },
  bottomText: {
    ...globalStyles.primaryText,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 10,
    width: '80%',
  },
});

export default styles;
