import { StyleSheet } from 'react-native';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';
import colors from '../../utils/theme/colors/colors';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  tabView: {
    ...globalStyles.mainContent,
  },
  bottomContainer: {
    ...globalStyles.bottomContainer,
  },
  dotContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3.5,
    backgroundColor: colors.lightGray,
    margin: 3,
  },
  selectedDot: {
    width: 15,
    height: 5,
    borderRadius: 3.5,
    backgroundColor: colors.main,
  },
});

export default styles;
