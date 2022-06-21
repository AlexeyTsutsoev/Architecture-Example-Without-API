import { StyleSheet } from 'react-native';
import colors from '../../../utils/theme/colors/colors';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  content: {
    backgroundColor: colors.mainBackground,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  title: {
    ...globalStyles.inputText,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  subTitle: {
    ...globalStyles.primaryText,
    fontWeight: '400',
  },
  loaderWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
