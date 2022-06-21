import { StyleSheet } from 'react-native';
import colors from '../../utils/theme/colors/colors';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.mainBackground,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    ...globalStyles.h1,
    marginBottom: 15,
  },
  subTitle: {
    ...globalStyles.primaryText,
    fontWeight: '400',
    textAlign: 'center',
  },
  item: {
    width: '100%',
    alignItems: 'center',
  },
  btnContainer: {
    height: '30%',
    justifyContent: 'space-between',
  },
});

export default styles;
