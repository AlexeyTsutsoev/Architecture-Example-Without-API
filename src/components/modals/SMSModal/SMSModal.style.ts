import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../hooks/useScale';
import colors from '../../../utils/theme/colors/colors';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    scrollContainer: {
      backgroundColor: colors.mainBackground,
    },
    container: {
      width: '100%',
      height: scale.deviceHeight * 0.5,
      paddingVertical: scale.scaleHeight(25),
      paddingHorizontal: scale.scaleWidth(25),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    itemContainer: {
      width: '100%',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    iconContainer: {
      width: '100%',
      alignItems: 'flex-end',
    },
    title: {
      ...globalStyles.pageName,
      marginBottom: scale.scaleHeight(10),
    },
    subTitle: {
      ...globalStyles.primaryText,
      fontWeight: '400',
    },
    inputStyle: {
      width: '100%',
      marginVertical: scale.scaleHeight(5),
      borderWidth: 1,
      borderColor: colors.lightGray,
      borderRadius: 5,
      padding: 10,
    },
    inputText: {
      ...globalStyles.inputText,
    },
    pressableStyle: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: scale.scaleHeight(10),
    },
  });

export default styles;
