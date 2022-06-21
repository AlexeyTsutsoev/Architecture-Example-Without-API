import { StyleSheet } from 'react-native';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';
import colors from '../../../utils/theme/colors/colors';
import { ScaleHookProps } from '../../../hooks/useScale';

const styles = ({ deviceHeight, scaleHeight, scaleWidth }: ScaleHookProps) =>
  StyleSheet.create({
    modalContainer: {
      backgroundColor: colors.mainBackground,
      height: deviceHeight * 0.9,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: scaleHeight(30),
      paddingHorizontal: scaleWidth(20),
    },
    mainContent: {
      width: '100%',
      height: '80%',
    },
    subTitle: {
      ...globalStyles.primaryText,
    },
    title: {
      ...globalStyles.inputText,
      color: colors.lightGray,
      marginVertical: scaleHeight(10),
    },
    btnContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

export default styles;
