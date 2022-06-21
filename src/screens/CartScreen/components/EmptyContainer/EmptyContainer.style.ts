import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../../hooks/useScale';
import globalStyles from '../../../../utils/theme/globalStyles/globalStyles';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      height: scale.deviceHeight * 0.65,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    item: {
      width: '100%',
      alignItems: 'center',
    },
    title: {
      ...globalStyles.h1,
      width: '90%',
      textAlign: 'center',
      marginBottom: 15,
    },
    subTitle: {
      ...globalStyles.primaryText,
      fontWeight: '400',
      width: '70%',
      textAlign: 'center',
    },
  });

export default styles;
