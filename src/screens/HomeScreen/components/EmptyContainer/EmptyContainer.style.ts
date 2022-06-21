import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../../hooks/useScale';
import globalStyles from '../../../../utils/theme/globalStyles/globalStyles';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: scale.deviceHeight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      ...globalStyles.pageName,
      marginVertical: scale.scaleHeight(40),
    },
  });

export default styles;
