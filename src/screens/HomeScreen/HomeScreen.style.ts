import { StyleSheet } from 'react-native';
import colors from '../../utils/theme/colors/colors';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.MainContainer,
  },
  headerContainer: {
    width: '100%',
    backgroundColor: colors.mainBackground,
  },
  headerContent: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    marginVertical: 30,
  },
  listContainer: {
    marginBottom: 30,
  },
  separator: {
    width: 15,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    padding: 20,
  },
  title: {
    ...globalStyles.inputText,
    marginVertical: 25,
  },
  loaderContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
});

export default styles;
