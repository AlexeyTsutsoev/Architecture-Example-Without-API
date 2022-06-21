import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../hooks/useScale';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingVertical: scale.scaleHeight(25),
      paddingLeft: scale.scaleWidth(55),
      backgroundColor: '#F7F4F4',
    },
    iconWrapper: {
      marginRight: scale.scaleWidth(23),
    },
    brandText: {
      ...globalStyles.primaryText,
      fontWeight: '400',
    },
    digitsText: {
      ...globalStyles.primaryText,
    },
  });

export default styles;
