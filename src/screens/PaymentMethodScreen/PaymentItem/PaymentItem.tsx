import React, { FC, useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';

import useScale from '../../../hooks/useScale';

import { Payment } from '../../../redux/paymentSource/reducer';

import Visa from '../../../assets/svgs/CardIcons/Visa.svg';
import MasterCardIcon from '../../../assets/svgs/CardIcons/MasterCardIcon.svg';

import styles from './PaymentItem.style';

type Props = {
  payment: Payment;
  onPress?: () => void;
};

const PaymentItem: FC<Props> = ({ payment, onPress }) => {
  // style
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  // varaibles
  const isVisa = payment.brand === 'visa';

  return (
    <Pressable onPress={onPress} style={stylesWithProps.container}>
      <View style={stylesWithProps.iconWrapper}>
        {isVisa ? <Visa /> : <MasterCardIcon />}
      </View>
      <Text style={stylesWithProps.brandText}>{payment.brand}</Text>
      <Text style={stylesWithProps.digitsText}>{`****${payment.last4}`}</Text>
    </Pressable>
  );
};

export default PaymentItem;
