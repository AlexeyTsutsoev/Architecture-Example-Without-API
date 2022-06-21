import { StyleSheet } from 'react-native';
import colors from '../../../utils/theme/colors/colors';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIndicator: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: colors.errorRed,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 25,
    top: 8,
    zIndex: 1,
  },
  indicatorText: {
    ...globalStyles.small,
    color: colors.textWhite,
  },
});

export default styles;
