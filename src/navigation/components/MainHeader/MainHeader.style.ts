import { StyleSheet } from 'react-native';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';
import scale, { deviceWidth } from '../../../utils/scale/scale';
import colors from '../../../utils/theme/colors/colors';

const styles = StyleSheet.create({
  container: {
    width: deviceWidth(),
    backgroundColor: colors.mainBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale.scaleH(20),
    paddingHorizontal: scale.scaleW(20),
    borderBottomColor: colors.headerBorder,
    borderBottomWidth: 1,
  },
  title: {
    ...globalStyles.pageName,
  },
  disableIcon: {
    opacity: 0,
  },
  arrowWrapper: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
