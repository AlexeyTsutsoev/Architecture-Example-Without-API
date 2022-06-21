import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../hooks/useScale';
import colors from '../../utils/theme/colors/colors';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      ...globalStyles.container,
      width: '100%',
    },
    mainContent: {
      width: '100%',
      marginTop: scale.scaleHeight(40),
      paddingHorizontal: scale.scaleWidth(20),
    },
    mainInfo: {
      width: '100%',
    },
    scrollView: {
      ...globalStyles.mainContent,
      width: scale.deviceWidth,
    },
    topContainer: {
      ...globalStyles.row,
    },
    infoContainer: {
      marginBottom: 12,
    },
    infoTopContainer: {
      width: '100%',
      paddingVertical: scale.scaleHeight(5),
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    infoTopItem: {
      flexDirection: 'row',
      marginVertical: scale.scaleHeight(5),
      marginRight: scale.scaleWidth(20),
    },
    infoBottomItem: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    infoItemText: {
      ...globalStyles.inputText,
    },
    marginText: {
      ...globalStyles.primaryText,
      color: colors.green,
      backgroundColor: colors.lightGreen,
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    iconMargin: {
      marginRight: 10,
    },
    descriptionText: {
      ...globalStyles.primaryText,
      fontWeight: '400',
    },
    bottomContainer: {
      ...globalStyles.bottomContainer,
    },
    iconWrapper: {
      paddingHorizontal: scale.scaleWidth(20),
      paddingVertical: scale.scaleHeight(20),
    },
  });

export default styles;
