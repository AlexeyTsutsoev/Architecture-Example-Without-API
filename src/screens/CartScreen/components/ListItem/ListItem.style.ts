import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../../hooks/useScale';
import colors from '../../../../utils/theme/colors/colors';
import globalStyles from '../../../../utils/theme/globalStyles/globalStyles';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      height: 190,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      marginBottom: scale.scaleHeight(40),
    },
    withLoading: {
      opacity: 0.5,
    },
    info: {
      flex: 1,
      height: '100%',
      paddingLeft: 20,
      justifyContent: 'space-between',
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    titleIcon: {
      marginLeft: 5,
    },
    title: {
      ...globalStyles.inputText,
      marginBottom: 5,
    },
    mainText: {
      ...globalStyles.primaryText,
      color: colors.navGray,
    },
    elipsesWrapper: {
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loaderWrapper: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dotContainer: {
      height: '100%',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
  });

export default styles;
