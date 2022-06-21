import React, { FC, ReactNode, useMemo } from 'react';
import { Modal, Pressable, StyleProp, View, ViewStyle } from 'react-native';
import * as Animatable from 'react-native-animatable';
import useScale from '../../../hooks/useScale';
import styles from './MainModal.style';

type Props = {
  isVisible: boolean;
  onPressOut: () => void;
  children: ReactNode;
  type?: 'center' | 'bottom' | 'top';
};

const MainModal: FC<Props> = ({ isVisible, onPressOut, children, type }) => {
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  const getPosition = (): StyleProp<ViewStyle> => {
    switch (type) {
      case 'center':
        return { justifyContent: 'center' };
      case 'bottom':
        return { justifyContent: 'flex-end' };
      case 'top':
        return { justifyContent: 'flex-start' };
      default:
        return { justifyContent: 'flex-end' };
    }
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <Pressable onPress={onPressOut}>
        <View style={[stylesWithProps.container, getPosition()]}>
          <Pressable>
            <Animatable.View
              duration={200}
              animation="slideInUp"
              style={[stylesWithProps.modalWindow]}>
              {children}
            </Animatable.View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default MainModal;
