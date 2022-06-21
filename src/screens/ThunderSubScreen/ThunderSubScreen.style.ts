import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../hooks/useScale';
import colors from '../../utils/theme/colors/colors';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      width: scale.deviceWidth,
      height: '100%',
      backgroundColor: colors.mainBackground,
    },
    mainContent: {
      flex: 1,
      width: '100%',
      padding: 20,
      justifyContent: 'space-between',
    },
    title: {
      ...globalStyles.inputText,
      marginBottom: scale.scaleHeight(12),
    },
    subTitle: {
      ...globalStyles.small,
      color: colors.lightGray,
      marginBottom: scale.scaleHeight(12),
    },
    text: {
      ...globalStyles.primaryText,
      fontWeight: '400',
      marginBottom: scale.scaleHeight(12),
    },
  });

export default styles;
