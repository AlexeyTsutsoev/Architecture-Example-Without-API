import React, { FC } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { Masks } from 'react-native-mask-input';

import CustomDatePicker from '../../inputs/CustomDatePicker/CustomDatePicker';
import CustomTextField from '../../inputs/CustomTextField/CustomTextField';
import LittleRedButton from '../../buttons/LittleRedButton/LittleRedButton';
import LittleBlackButton from '../../buttons/LittleBlackButton/LittleBlackButton';

import styles from './AddNewCardModal.style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = {
  onPress?: () => void;
};

const validation = yup.object().shape({
  cardNumber: yup
    .number()
    .required('card number is required')
    .min(19, 'card number must be full'),
  name: yup.string().required('name of card holder is required'),
  expirationDate: yup
    .string()
    .required('Expiration Date is required')
    .min(7, 'invalid date'),
  cvv: yup.string().required('cvv is required'),
});

const AddNewCardModal: FC<Props> = ({ onPress }) => {
  // formik
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      cardNumber: '',
      name: '',
      expirationDate: '',
      cvv: '',
    },
    validationSchema: validation,
    onSubmit: () => console.log('test'),
  });

  // helpers
  const onCancel = () => {
    resetForm();
    if (onPress) {
      onPress();
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Adding a new card</Text>
        <KeyboardAwareScrollView style={styles.mainContent}>
          <CustomTextField
            value={values.cardNumber}
            onChangeText={handleChange('cardNumber')}
            onBlur={handleBlur('cardNumber')}
            errorText={errors.cardNumber}
            touched={touched.cardNumber}
            title="Card number"
            keyboardType="numeric"
            returnKeyType="done"
            masked
            mask={Masks.CREDIT_CARD}
          />
          <CustomTextField
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            errorText={errors.name}
            touched={touched.name}
            title="Name of Cardholder"
            returnKeyType="done"
          />
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <CustomDatePicker
                value={values.expirationDate}
                onChangeText={handleChange('expirationDate')}
                onBlur={handleBlur('expirationDate')}
                errorText={errors.expirationDate}
                touched={touched.expirationDate}
                title="Expiration Date"
                mask={[/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                placeholder="MM/YYYY"
              />
            </View>
            <View style={styles.rowItem}>
              <CustomTextField
                value={values.cvv}
                onChangeText={handleChange('cvv')}
                onBlur={handleBlur('cvv')}
                errorText={errors.cvv}
                touched={touched.cvv}
                title="CVV"
                returnKeyType="done"
                isSecure
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.row}>
          <LittleRedButton title="< Cancel" onPress={onCancel} />
          <LittleBlackButton title="Add >" onPress={handleSubmit} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddNewCardModal;
