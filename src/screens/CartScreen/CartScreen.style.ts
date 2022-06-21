import { StyleSheet } from 'react-native';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.MainContainer,
    height: '100%',
  },
  contentContainerStyle: {
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default styles;
