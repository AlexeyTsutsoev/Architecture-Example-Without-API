import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../../hooks/useScale';
import colors from '../../../../utils/theme/colors/colors';
import globalStyles from '../../../../utils/theme/globalStyles/globalStyles';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    statisticContainer: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginVertical: scale.scaleHeight(40),
    },
    staticticLoading: {
      opacity: 0.5,
    },
    loaderContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    statisticItem: {
      flexDirection: 'row',
      width: '47%',
      paddingHorizontal: scale.scaleHeight(10),
      paddingVertical: scale.scaleWidth(10),
    },
    textContainer: {
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    iconStyle: {
      marginRight: scale.scaleWidth(10),
    },
    statTitle: {
      ...globalStyles.inputText,
    },
    statSubTitle: {
      ...globalStyles.inputText,
      color: colors.lightGray,
    },
    headerTitle: {
      marginVertical: scale.scaleHeight(25),
    },
  });

export default styles;
