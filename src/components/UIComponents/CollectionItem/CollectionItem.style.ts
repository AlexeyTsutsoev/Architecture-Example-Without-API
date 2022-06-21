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
    loading: {
      opacity: 0.5,
    },
    imageContainer: {
      width: '47%',
      height: '100%',
    },
    image: {
      width: '100%',
      height: '100%',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
    },
    plusRemoveContainer: {
      position: 'absolute',
      height: scaleHeight(35),
      width: scaleWidth(35),
      alignItems: 'center',
      justifyContent: 'center',
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
      height: 20,
      width: 20,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    loadingContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default styles;
