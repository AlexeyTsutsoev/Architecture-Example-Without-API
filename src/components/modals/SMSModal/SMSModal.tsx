import React, { FC, useMemo, useState } from 'react';
import useScale from '../../../hooks/useScale';
import { Payment } from '../../../redux/paymentSource/reducer';
import MasterCardIcon from '../../../assets/svgs/CardIcons/MasterCardIcon.svg';
import Visa from '../../../assets/svgs/CardIcons/Visa.svg';
import styles from './SMSModal.style';
import { Pressable, Text, TextInput, View } from 'react-native';
import BigButton from '../../buttons/BigButton/BigButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = {
  payment: Payment;
};

const SMSModal: FC<Props> = ({ payment }) => {
  // style
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  //state
  const [code, setCode] = useState<string>('');

  //memo
  const isVisa = useMemo(() => payment.brand === 'visa', [payment.brand]);

  return (
    <KeyboardAwareScrollView style={stylesWithProps.scrollContainer}>
      <View style={stylesWithProps.container}>
        <View style={stylesWithProps.iconContainer}>
          {isVisa ? <Visa /> : <MasterCardIcon />}
        </View>
        <View style={stylesWithProps.itemContainer}>
          <Text style={stylesWithProps.title}>Purchase Authentication</Text>
          <Text style={stylesWithProps.subTitle}>
            {`We've sent you a text message to your registered mobile number ending in ${payment.last4}`}
          </Text>
        </View>
        <View style={stylesWithProps.itemContainer}>
          <Text>Confirmation code</Text>
          <TextInput
            placeholder="Enter your code..."
            style={[stylesWithProps.inputStyle, stylesWithProps.inputText]}
            value={code}
            onChangeText={setCode}
          />
        </View>
        <View style={stylesWithProps.itemContainer}>
          <BigButton title="Confirm payment" onPress={() => null} />
          <Pressable style={stylesWithProps.pressableStyle}>
            <Text style={stylesWithProps.subTitle}>Resend code</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SMSModal;
