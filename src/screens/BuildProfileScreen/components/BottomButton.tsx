import React, { FC } from 'react';
import { View } from 'react-native';
import BigButton from '../../../components/buttons/BigButton/BigButton';
import LittleBlackButton from '../../../components/buttons/LittleBlackButton/LittleBlackButton';
import LittleRedButton from '../../../components/buttons/LittleRedButton/LittleRedButton';
import globalStyles from '../../../utils/theme/globalStyles/globalStyles';

type Props = {
  text: string;
  route: string;
  onPress: () => void;
  onBack: () => void;
};

const BottomButton: FC<Props> = ({ text, route, onPress, onBack }: Props) => {
  if (route === 'first') {
    return <BigButton type="black" title={text} onPress={onPress} />;
  }
  return (
    <View style={globalStyles.row}>
      <LittleRedButton title="< Back" onPress={onBack} />
      <LittleBlackButton title={text} onPress={onPress} />
    </View>
  );
};

export default BottomButton;
