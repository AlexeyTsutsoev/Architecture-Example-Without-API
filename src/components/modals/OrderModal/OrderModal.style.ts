import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../hooks/useScale';
import colors from '../../../utils/theme/colors/colors';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: scale.scaleWidth(20),
      paddingVertical: scale.scaleHeight(20),
      height: scale.deviceHeight * 0.7,
      backgroundColor: colors.mainBackground,
      alignItems: 'center',
    },
    title: {
      ...globalStyles.inputText,
      width: '100%',
      textAlign: 'left',
      marginBottom: scale.scaleHeight(10),
    },
    subTitle: {
      ...globalStyles.primaryText,
      width: '100%',
      textAlign: 'left',
      fontWeight: '400',
    },
    pressableContainer: {
      width: scale.deviceWidth,
      paddingHorizontal: scale.scaleWidth(30),
      paddingVertical: scale.scaleHeight(20),
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    pressableText: {
      ...globalStyles.inputText,
    },
    iconStyle: {
      marginRight: scale.scaleWidth(35),
    },
    bottomContainer: {
      ...globalStyles.bottomContainerWithText,
    },
    row: {
      ...globalStyles.row,
    },
    mainContent: {
      width: '100%',
    },
  });

export default styles;
