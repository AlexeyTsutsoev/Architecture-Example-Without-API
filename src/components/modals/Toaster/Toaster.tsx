import React, { FC, useMemo } from 'react';
import { View, Text, Modal, SafeAreaView } from 'react-native';
import useScale from '../../../hooks/useScale';
import styles from './Toaster.style';

type Props = {
  visible: boolean;
  text: string;
  type?: 'top' | 'bottom';
};

const Toaster: FC<Props> = ({ text, visible, type }) => {
  // styles
  const scale = useScale();
  const styleWithProps = useMemo(() => styles(scale), [scale]);

  const getStyles = () => {
    switch (type) {
      case 'bottom':
        return styleWithProps.bottom;
      case 'top':
        return styleWithProps.top;
      default:
        return styleWithProps.top;
    }
  };

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <SafeAreaView style={[styleWithProps.modal, getStyles()]}>
        <View style={styleWithProps.contaner}>
          <Text style={styleWithProps.text}>{text}</Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default Toaster;
