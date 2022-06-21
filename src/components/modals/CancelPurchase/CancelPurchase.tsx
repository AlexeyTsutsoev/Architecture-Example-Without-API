import React, { FC } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import LittleBlackButton from '../../buttons/LittleBlackButton/LittleBlackButton';
import LittleRedButton from '../../buttons/LittleRedButton/LittleRedButton';

import WhiteCloseIcon from '../../../assets/svgs/general/WhiteCloseIcon.svg';

import styles from './CancelPurchase.style';

type Props = {
  onCancel: () => void;
  onProceed: () => void;
};

const CancelPurchase: FC<Props> = ({ onCancel, onProceed }) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Are you sure you want to cancel purchase?
        </Text>
        <Text style={styles.subTitle}>You can do it next time.</Text>
        <View style={styles.bottom}>
          <LittleRedButton
            title="Yes, cancel"
            accessoryLeft={() => <WhiteCloseIcon />}
            onPress={onCancel}
          />
          <LittleBlackButton title="No, proceed >" onPress={onProceed} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CancelPurchase;
