import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../hooks/useScale';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = (scale: ScaleHookProps) =>
  StyleSheet.create({
    continer: {
      ...globalStyles.container,
    },
    title: {
      ...globalStyles.h1,
      marginBottom: scale.scaleHeight(15),
      width: '100%',
      textAlign: 'left',
    },
    subTitle: {
      ...globalStyles.primaryText,
      marginBottom: scale.scaleHeight(15),
      fontWeight: '400',
      width: '100%',
      textAlign: 'left',
    },
    contentContainer: {
      width: '100%',
    },
    collapseContainer: {
      alignItems: 'center',
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'flex-start',
      paddingLeft: scale.scaleWidth(55),
    },
    radioContent: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginVertical: scale.scaleHeight(10),
    },
    iconStyle: {
      marginRight: scale.scaleWidth(35),
    },
    radioTitle: {
      ...globalStyles.inputText,
      marginBottom: scale.scaleHeight(10),
    },
    radioSubTitle: {
      ...globalStyles.buttonText,
      fontWeight: '400',
      width: '70%',
    },
  });

export default styles;
