import { StyleSheet } from 'react-native';
import colors from '../../utils/theme/colors/colors';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  textContainer: {
    width: '100%',
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    ...globalStyles.h1,
    marginBottom: 15,
  },
  subTitle: {
    ...globalStyles.primaryText,
  },
  blueText: {
    ...globalStyles.primaryText,
    color: colors.blueLink,
  },
});

export default styles;
