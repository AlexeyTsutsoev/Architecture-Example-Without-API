import React, { FC, useMemo } from 'react';
import { View, Text } from 'react-native';
import LittleBlackButton from '../../../../components/buttons/LittleBlackButton/LittleBlackButton';
import LittleRedButton from '../../../../components/buttons/LittleRedButton/LittleRedButton';
import useScale from '../../../../hooks/useScale';
import styles from './LogoutModal.style';

type Props = {
  onLogOut: () => void;
  onReturn: () => void;
};

const LogoutModal: FC<Props> = ({ onLogOut, onReturn }) => {
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  return (
    <View style={stylesWithProps.container}>
      <Text style={stylesWithProps.title}>
        Are you sure you want to Log Out?
      </Text>
      <View style={stylesWithProps.buttonContainer}>
        <LittleBlackButton title="No, Return" onPress={onReturn} />
        <LittleRedButton title="Yes, Log Out" onPress={onLogOut} />
      </View>
    </View>
  );
};

export default LogoutModal;
