import { StyleSheet } from 'react-native';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';
import scale, { deviceWidth } from '../../../utils/scale/scale';
import colors from '../../../utils/theme/colors/colors';

const styles = StyleSheet.create({
  container: {
    width: deviceWidth(),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.textWhite,
    paddingVertical: scale.scaleH(20),
    paddingHorizontal: scale.scaleW(20),
    borderBottomColor: colors.headerBorder,
    borderBottomWidth: 1,
    zIndex: 1,
  },
  title: {
    ...globalStyles.pageName,
  },
  disableIcon: {
    opacity: 0,
  },
});

export default styles;
