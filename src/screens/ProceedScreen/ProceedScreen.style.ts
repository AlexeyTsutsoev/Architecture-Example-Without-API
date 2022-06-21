import { StyleSheet } from 'react-native';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  title: {
    ...globalStyles.h1,
    width: '100%',
    marginBottom: 10,
  },
  bottomContainer: {
    ...globalStyles.bottomContainer,
  },
});

export default styles;
