import { StyleSheet } from 'react-native';
import globalStyles from '../../../../utils/theme/globalStyles/globalStyles';
import colors from '../../../../utils/theme/colors/colors';
import { ScaleHookProps } from '../../../../hooks/useScale';

const styles = ({ scaleHeight }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      ...globalStyles.h1,
      color: colors.main,
      marginVertical: scaleHeight(50),
    },
    row: {
      ...globalStyles.row,
      alignItems: 'flex-start',
      zIndex: 2,
    },
    rowItem: {
      width: '47%',
      zIndex: 2,
    },
  });

export default styles;
