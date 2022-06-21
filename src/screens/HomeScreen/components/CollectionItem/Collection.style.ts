import { StyleSheet } from 'react-native';
import globalStyles from '../../../../utils/theme/globalStyles/globalStyles';
import colors from '../../../../utils/theme/colors/colors';
import { ScaleHookProps } from '../../../../hooks/useScale';

const styles = ({ scaleHeight, scaleWidth }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      width: scaleWidth(190),
      height: 220,
      marginRight: scaleWidth(10),
    },
    imageStyle: {
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: scaleWidth(20),
      paddingVertical: scaleHeight(30),
    },
    starContainer: {
      width: '100%',
      alignItems: 'flex-end',
    },
    title: {
      ...globalStyles.inputText,
      color: colors.textWhite,
    },
    unpressed: {
      opacity: 1,
    },
    pressed: {
      opacity: 0.5,
    },
  });

export default styles;
