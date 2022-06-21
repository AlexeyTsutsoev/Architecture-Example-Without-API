import { StyleSheet } from 'react-native';
import globalStyles from '../../../../utils/theme/globalStyles/globalStyles';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
  },
  textContainer: {
    width: '80%',
  },
  title: {
    ...globalStyles.h1,
    textAlign: 'center',
  },
  subTitle: {
    ...globalStyles.primaryText,
    textAlign: 'center',
  },
  icon: {
    marginVertical: 30,
  },
});

export default styles;
