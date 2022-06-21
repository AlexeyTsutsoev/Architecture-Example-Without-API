import { StyleSheet } from 'react-native';
import colors from '../../../utils/theme/colors/colors';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: colors.mainBackground,
    width: '100%',
  },
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  bottom: {
    ...globalStyles.row,
  },
  title: {
    ...globalStyles.h1,
    textAlign: 'center',
    marginBottom: 10,
  },
  subTitle: {
    ...globalStyles.primaryText,
    textAlign: 'center',
    fontWeight: '400',
    marginBottom: 40,
  },
});

export default styles;
