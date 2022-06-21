import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../hooks/useScale';
import colors from '../../utils/theme/colors/colors';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      ...globalStyles.container,
    },
    scrollView: {
      ...globalStyles.mainContent,
      width: scale.deviceWidth,
    },
    mainContent: {
      width: '100%',
      paddingHorizontal: 20,
    },
    imageContainer: {
      width: scale.deviceWidth,
      height: scale.deviceWidth,
      justifyContent: 'space-between',
    },
    imageItem: {
      width: '100%',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      paddingHorizontal: scale.scaleWidth(20),
      paddingVertical: scale.scaleHeight(25),
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
      marginTop: scale.scaleHeight(40),
      width: '38%',
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
    title: {
      ...globalStyles.h1,
      color: colors.textWhite,
    },
  });

export default styles;
