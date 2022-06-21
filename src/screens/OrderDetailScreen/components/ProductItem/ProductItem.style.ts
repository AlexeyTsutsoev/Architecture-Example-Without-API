import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../../hooks/useScale';
import colors from '../../../../utils/theme/colors/colors';
import globalStyles from '../../../../utils/theme/globalStyles/globalStyles';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 190,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: scale.scaleHeight(25),
    },
    item: {
      width: '47%',
      height: '100%',
    },
    info: {
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    title: {
      ...globalStyles.inputText,
      marginBottom: 5,
    },
    sum: {
      ...globalStyles.primaryText,
      color: colors.navGray,
    },
    marginStyle: {
      ...globalStyles.primaryText,
      color: colors.green,
      paddingHorizontal: scale.scaleWidth(10),
      paddingVertical: scale.scaleHeight(8),
      backgroundColor: colors.lightGreen,
    },
  });

export default styles;
