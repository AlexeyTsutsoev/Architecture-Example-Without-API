import { StyleSheet } from 'react-native';
import globalStyles from '../../../../utils/theme/globalStyles/globalStyles';
import colors from '../../../../utils/theme/colors/colors';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...globalStyles.inputText,
    color: colors.lightGray,
    textAlign: 'center',
    width: '50%',
    marginVertical: 20,
  },
});

export default styles;
