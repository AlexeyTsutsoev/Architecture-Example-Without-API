import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../hooks/useScale';
import colors from '../../../utils/theme/colors/colors';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      height: scale.scaleHeight(440),
      paddingHorizontal: 20,
      paddingVertical: scale.scaleHeight(30),
      backgroundColor: colors.mainBackground,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    modalItem: {
      width: '100%',
    },
    mainContent: {
      width: '100%',
      alignItems: 'center',
    },
    rowContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textMain: {
      width: '100%',
      textAlign: 'left',
      marginBottom: 15,
    },
    title: {
      ...globalStyles.inputText,
    },
    subTitle: {
      ...globalStyles.primaryText,
      fontWeight: '400',
    },
    marginText: {
      ...globalStyles.primaryText,
      padding: 10,
      backgroundColor: colors.lightGreen,
      color: colors.green,
    },
  });

export default styles;
