import React, { FC, useMemo } from 'react';
import { Text, View } from 'react-native';
import useScale from '../../../hooks/useScale';
import LittleBlackButton from '../../buttons/LittleBlackButton/LittleBlackButton';
import LittleRedButton from '../../buttons/LittleRedButton/LittleRedButton';
import styles from './DiscardChangesModal.style';

type Props = {
  title: string;
  returnText: string;
  discardText: string;
  onReturn: () => void;
  onDiscard: () => void;
};

const DiscardChangesModal: FC<Props> = ({
  returnText,
  title,
  discardText,
  onReturn,
  onDiscard,
}) => {
  // style
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  return (
    <View style={stylesWithProps.container}>
      <Text style={stylesWithProps.title}>{title}</Text>
      <View style={stylesWithProps.buttonContainer}>
        <LittleBlackButton title={returnText} onPress={onReturn} />
        <LittleRedButton title={discardText} onPress={onDiscard} />
      </View>
    </View>
  );
};

export default DiscardChangesModal;
