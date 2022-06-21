import { ScaleHookProps } from '../../../../hooks/useScale';
import { StyleSheet } from 'react-native';
import globalStyles from '../../../../utils/theme/globalStyles/globalStyles';
import colors from '../../../../utils/theme/colors/colors';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    generalContainer: {
      width: scale.scaleWidth(155),
      height: 190,
    },
    imageStyle: {
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      marginBottom: scale.scaleHeight(12),
    },
    generalIconContainer: {
      paddingHorizontal: scale.scaleWidth(10),
      paddingVertical: scale.scaleHeight(10),
    },
    pressedContainer: {
      opacity: 0.5,
    },
    titleText: {
      ...globalStyles.primaryText,
      marginBottom: scale.scaleHeight(5),
    },
    priceText: {
      ...globalStyles.primaryText,
      color: colors.lightGray,
    },
    loaderContainer: {
      position: 'absolute',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
  });

export default styles;
