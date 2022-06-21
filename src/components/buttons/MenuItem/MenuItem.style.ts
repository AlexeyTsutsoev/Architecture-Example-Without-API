import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../hooks/useScale';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';

const styles = ({ scaleWidth, scaleHeight }: ScaleHookProps) =>
  StyleSheet.create({
    popUpItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingVertical: scaleHeight(20),
      paddingHorizontal: scaleWidth(20),
    },
    popUpText: {
      ...globalStyles.primaryText,
      marginLeft: scaleWidth(18),
    },
  });

export default styles;
