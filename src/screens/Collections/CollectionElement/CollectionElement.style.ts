import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../hooks/useScale';
import colors from '../../../utils/theme/colors/colors';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';

const styles = ({ scaleHeight, scaleWidth }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 190,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: scaleHeight(25),
    },
    imageContainer: {
      width: '47%',
      height: '100%',
    },
    image: {
      flex: 1,
      position: 'relative',
    },
    plusRemoveContainer: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
    nameText: {
      ...globalStyles.inputText,
      marginBottom: scaleHeight(10),
      width: '90%',
    },
    grayText: {
      ...globalStyles.bubleText,
      color: colors.navGray,
      marginBottom: scaleHeight(5),
    },
    infoContainer: {
      height: '100%',
      width: '47%',
      justifyContent: 'space-between',
    },
    headerTitle: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    iconWrapper: {
      height: scaleHeight(20),
      width: scaleWidth(20),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default styles;
