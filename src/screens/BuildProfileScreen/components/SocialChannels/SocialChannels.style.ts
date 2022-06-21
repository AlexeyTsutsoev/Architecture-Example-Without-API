import { StyleSheet } from 'react-native';
import globalStyles from '../../../../utils/theme/globalStyles/globalStyles';
import colors from '../../../../utils/theme/colors/colors';
import { ScaleHookProps } from '../../../../hooks/useScale';

const styles = ({ scaleWidth, scaleHeight }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      flexWrap: 'wrap',
    },
    itemContainer: {
      flexDirection: 'row',
      width: scaleWidth(110),
      height: scaleHeight(30),
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 28,
      backgroundColor: colors.inputBackground,
      padding: 5,
    },
    selectedItem: {
      backgroundColor: colors.main,
    },
    itemText: {
      ...globalStyles.bubleText,
      flex: 1,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedText: {
      color: colors.textWhite,
    },
    unselectedCheck: {
      opacity: 0,
    },
    title: {
      ...globalStyles.h1,
      marginVertical: scaleHeight(15),
    },
    selectText: {
      ...globalStyles.primaryText,
      marginBottom: scaleHeight(30),
    },
    selectedNum: {
      opacity: 0.5,
    },
  });

export default styles;
