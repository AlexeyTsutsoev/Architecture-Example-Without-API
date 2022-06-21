import { StyleSheet } from 'react-native';
import colors from '../../../../utils/theme/colors/colors';
import globalStyles from '../../../../utils/theme/globalStyles/globalStyles';

const styles = StyleSheet.create({
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
  title: {
    ...globalStyles.inputText,
    marginVertical: 25,
  },
});

export default styles;
