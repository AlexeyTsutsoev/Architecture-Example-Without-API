import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../hooks/useScale';
import colors from '../../utils/theme/colors/colors';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    main: {
      width: '100%',
      alignItems: 'center',
    },
    scrollContainer: {
      backgroundColor: colors.mainBackground,
      width: '100%',
    },
    container: {
      paddingHorizontal: 20,
    },
    itemTitle: {
      ...globalStyles.inputText,
      marginVertical: scale.scaleHeight(25),
    },
    info: {
      ...globalStyles.buttonText,
      fontWeight: '400',
    },
    cardInfo: {
      ...globalStyles.buttonText,
    },
    cardInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    cardIconStyle: {
      marginRight: scale.scaleWidth(20),
    },
    summaryContainer: {
      width: scale.deviceWidth,
      marginTop: scale.scaleHeight(27),
      paddingVertical: 5,
      borderTopColor: colors.navGray,
      borderTopWidth: 1,
    },
    summaryRow: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: scale.scaleHeight(20),
    },
    summaryTitle: {
      ...globalStyles.buttonText,
      color: colors.lightGray,
    },
    total: {
      ...globalStyles.inputText,
      fontSize: 20,
      zIndex: 1,
    },
    btnContainer: {
      ...globalStyles.bottomContainerWithText,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    btn: {
      width: '47%',
    },
    scrollWrapper: {
      paddingBottom: scale.deviceHeight * 0.17,
    },
  });

export default styles;
