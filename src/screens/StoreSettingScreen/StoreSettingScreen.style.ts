import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../hooks/useScale';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = ({ scaleHeight, scaleWidth, deviceHeight }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      ...globalStyles.container,
    },
    mainContent: {
      height: deviceHeight * 0.6,
      width: '100%',
    },
    row: {
      ...globalStyles.row,
      alignItems: 'flex-end',
    },
    rowItem: {
      width: '50%',
    },
    bottomContainer: {
      ...globalStyles.bottomContainer,
    },
    text: {
      ...globalStyles.pageName,
      marginBottom: scaleHeight(25),
      marginLeft: scaleWidth(6),
    },
  });

export default styles;
