import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../hooks/useScale';
import colors from '../../../utils/theme/colors/colors';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    imageContainer: {
      width: scale.deviceWidth,
      height: scale.deviceWidth,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    containImage: {
      flex: 1,
      width: scale.deviceWidth,
    },
    item: {
      padding: 20,
      width: '100%',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    pressableWrapper: {
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      ...globalStyles.h1,
      color: colors.textWhite,
    },
    subTitle: {
      ...globalStyles.primaryText,
      color: colors.textWhite,
      marginTop: scale.scaleHeight(10),
    },
  });

export default styles;
