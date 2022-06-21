import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../hooks/useScale';
import colors from '../../../utils/theme/colors/colors';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';

const styles = ({ scaleHeight, scaleWidth }: ScaleHookProps) =>
  StyleSheet.create({
    contaner: {
      width: '100%',
    },
    rail: {
      flex: 1,
      height: 2,
      backgroundColor: colors.lightGray,
    },
    selectedRail: {
      height: 2,
      backgroundColor: colors.blueLink,
    },
    thumb: {
      width: scaleWidth(20),
      height: scaleWidth(20),
      backgroundColor: colors.mainBackground,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: colors.blueLink,
    },
    title: {
      ...globalStyles.primaryText,
      marginBottom: scaleHeight(20),
    },
  });

export default styles;
