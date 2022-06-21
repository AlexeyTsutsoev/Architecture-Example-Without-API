import { StyleSheet } from 'react-native';
import { ScaleHookProps } from '../../../hooks/useScale';

const styles = ({ deviceWidth, deviceHeight }: ScaleHookProps) =>
  StyleSheet.create({
    container: {
      height: deviceHeight,
      width: deviceWidth,
      alignItems: 'center',
      backgroundColor: 'rgba(84, 84, 84, 0.8)',
      zIndex: 1,
    },
    modalWindow: {
      width: deviceWidth,
      zIndex: 1,
    },
  });

export default styles;
