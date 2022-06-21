import { StyleSheet } from 'react-native';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';
import { ScaleHookProps } from '../../hooks/useScale';

const styles = ({ scaleHeight }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      ...globalStyles.container,
    },
    itemContainer: {
      marginVertical: scaleHeight(30),
    },
    title: {
      ...globalStyles.inputText,
      width: '100%',
      textAlign: 'left',
      marginBottom: scaleHeight(25),
    },
    contentContainer: {
      width: '100%',
      height: '100%',
    },
    headerFilterStyles: {
      flexDirection: 'row',
      marginBottom: scaleHeight(20),
    },
  });

export default styles;
