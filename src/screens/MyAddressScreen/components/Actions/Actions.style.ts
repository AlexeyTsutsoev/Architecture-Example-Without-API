import { StyleSheet } from 'react-native';
import globalStyles from '../../../../utils/theme/globalStyles/globalStyles';
import colors from '../../../../utils/theme/colors/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
  },
  touchableZone: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  delete: {
    backgroundColor: colors.errorRed,
  },
  title: {
    ...globalStyles.buttonText,
    marginTop: 10,
  },
  deleteTitle: {
    color: colors.textWhite,
  },
});

export default styles;
