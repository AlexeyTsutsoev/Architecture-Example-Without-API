import { StyleSheet } from 'react-native';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';
import colors from '../../utils/theme/colors/colors';
import { ScaleHookProps } from '../../hooks/useScale';

const styles = ({ deviceHeight, scaleWidth }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      ...globalStyles.container,
    },
    mainContainer: {
      width: '100%',
      height: deviceHeight * 0.75,
    },
    TitleContainer: {
      height: deviceHeight * 0.2,
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabView: {
      width: '100%',
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomContainer: {
      ...globalStyles.bottomContainerWithText,
      justifyContent: 'space-between',
    },
    dotContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    dot: {
      width: 5,
      height: 5,
      borderRadius: 3.5,
      backgroundColor: colors.lightGray,
      margin: 3,
    },
    selectedDot: {
      width: 15,
      height: 5,
      borderRadius: 3.5,
      backgroundColor: colors.main,
    },
    title: {
      ...globalStyles.h1,
      marginLeft: scaleWidth(20),
    },
  });

export default styles;
