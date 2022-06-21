import { StyleSheet } from 'react-native';
import globalStyles from '../../../../utils/theme/globalStyles/globalStyles';
import { ScaleHookProps } from '../../../../hooks/useScale';

const styles = ({ scaleHeight }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      ...globalStyles.mainContent,
    },
    title: {
      ...globalStyles.h1,
      marginVertical: scaleHeight(50),
    },
  });

export default styles;
