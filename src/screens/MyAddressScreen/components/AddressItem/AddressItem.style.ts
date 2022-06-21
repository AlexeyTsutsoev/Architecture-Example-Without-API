import { StyleSheet } from 'react-native';
import colors from '../../../../utils/theme/colors/colors';
import globalStyles from '../../../../utils/theme/globalStyles/globalStyles';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.mainBackground,
    paddingBottom: 20,
  },
  textContainer: {
    width: '70%',
  },
  title: {
    ...globalStyles.pageName,
    marginBottom: 10,
  },
  subTitle: {
    ...globalStyles.inputText,
    fontWeight: 'normal',
  },
  iconArea: {
    width: 20,
    height: 20,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

export default styles;
