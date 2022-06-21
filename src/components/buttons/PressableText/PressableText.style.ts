import { StyleSheet } from 'react-native';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';
import colors from '../../../utils/theme/colors/colors';

const styles = StyleSheet.create({
  general: {
    padding: 5,
    paddingLeft: 0,
  },
  pressed: {
    opacity: 0.5,
    borderRadius: 5,
  },
  text: {
    ...globalStyles.buttonText,
    color: colors.blueLink,
  },
});

export default styles;
