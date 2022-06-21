import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../hooks/useScale';
import colors from '../../../utils/theme/colors/colors';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';

const styles = (_: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    title: {
      ...globalStyles.primaryText,
      marginBottom: 10,
    },
    itemContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingVertical: 15,
    },
    checkboxBasicStyle: {
      padding: 10,
      borderRadius: 50,
    },
    checkboxPressedStyle: {
      backgroundColor: 'rgba(204, 204, 204, 0.3)',
    },
    checkedUnPressedStyle: {
      backgroundColor: colors.textWhite,
    },
    checkboxTitle: {
      ...globalStyles.inputText,
      flex: 1,
    },
    listWrapper: {
      width: '100%',
    },
    itemTitle: {
      ...globalStyles.inputText,
    },
    itemSubTitle: {
      ...globalStyles.buttonText,
      fontWeight: '400',
      marginTop: 10,
    },
    textContainer: {
      marginLeft: 10,
      width: '90%',
    },
  });

export default styles;
