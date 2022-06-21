import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../../hooks/useScale';
import colors from '../../../../utils/theme/colors/colors';
import globalStyles from '../../../../utils/theme/globalStyles/globalStyles';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      width: scale.deviceWidth,
      height: scale.deviceWidth,
      justifyContent: 'space-between',
    },
    item: {
      width: '100%',
      paddingVertical: scale.scaleHeight(22),
      paddingHorizontal: 20,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    arrowTouch: {
      width: scale.scaleWidth(20),
      height: scale.scaleHeight(20),
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    title: {
      ...globalStyles.h1,
      color: colors.textWhite,
      marginBottom: scale.scaleHeight(10),
    },
    subTitle: {
      ...globalStyles.primaryText,
      color: colors.textWhite,
    },
  });

export default styles;
