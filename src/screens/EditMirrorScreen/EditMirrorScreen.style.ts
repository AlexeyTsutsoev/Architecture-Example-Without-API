import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../hooks/useScale';
import colors from '../../utils/theme/colors/colors';
import globalStyles from '../../utils/theme/globalStyles/globalStyles';

const styles = ({ scaleHeight, scaleWidth, deviceWidth }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      ...globalStyles.container,
    },
    scrollViewWrapper: {
      height: '85%',
      width: '100%',
    },
    imageContainer: {
      width: '100%',
      height: '100%',
    },
    bottomContainer: {
      ...globalStyles.bottomContainer,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      ...globalStyles.h1,
      width: '100%',
      textAlign: 'left',
    },
    subTitle: {
      ...globalStyles.primaryText,
      fontWeight: '400',
      marginVertical: scaleHeight(15),
    },
    row: {
      ...globalStyles.row,
      alignItems: 'flex-end',
    },
    rowItem: {
      width: '50%',
    },
    khoyn: {
      ...globalStyles.pageName,
      marginBottom: scaleHeight(25),
      marginLeft: scaleHeight(6),
    },
    marginWrapper: {
      marginBottom: scaleHeight(15),
    },
    addPhotoTitle: {
      ...globalStyles.primaryText,
      marginBottom: scaleHeight(10),
    },
    addPhotho: {
      width: '100%',
      height: deviceWidth,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: colors.lightGray,
      borderWidth: 1,
    },
    ball: {
      height: 20,
      width: 20,
      borderRadius: 50,
    },
    separator: {
      width: scaleWidth(30),
    },
    fotterMargin: {
      marginHorizontal: scaleWidth(30),
    },
    contentContainer: {
      alignItems: 'center',
    },
  });

export default styles;
