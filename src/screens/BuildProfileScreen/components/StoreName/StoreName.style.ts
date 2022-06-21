import { StyleSheet } from 'react-native';
import globalStyles from '../../../../utils/theme/globalStyles/globalStyles';
import colors from '../../../../utils/theme/colors/colors';
import { ScaleHookProps } from '../../../../hooks/useScale';

const styles = ({ scaleHeight, scaleWidth }: ScaleHookProps) =>
  StyleSheet.create({
    title: {
      ...globalStyles.h1,
      color: colors.main,
      marginVertical: scaleHeight(50),
    },
    row: {
      ...globalStyles.row,
      alignItems: 'flex-end',
    },
    rowItem: {
      width: '50%',
    },
    textMargin: {
      marginBottom: scaleHeight(30),
      marginLeft: scaleWidth(6),
    },
    text: {
      ...globalStyles.pageName,
      color: colors.main,
    },
  });

export default styles;
