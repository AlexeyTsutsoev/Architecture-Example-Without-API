import React, { FC, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CustomTextField from '../../../../components/inputs/CustomTextField/CustomTextField';
import {
  lastNameValidation,
  nameValidation,
  phoneValidation,
} from '../../../../utils/validation/validation';
import CustomDropDown from '../../../../components/inputs/CustomDropDown/CustomDropDown';
import styles from './MainInfoForm.style';
import CustomDatePicker from '../../../../components/inputs/CustomDatePicker/CustomDatePicker';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import { updateMainInfo } from '../../store/reducer';
import { ValueType } from 'react-native-dropdown-picker';
import { useAppDispatch } from '../../../../redux/store';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useScale from '../../../../hooks/useScale';

const validation = yup.object().shape({
  firstName: nameValidation,
  lastName: lastNameValidation,
  // @TODO: replace to Date
  dob: yup.string().required('enter dob'),
  // country: countryValidation,
  phoneNumber: phoneValidation,
});

const genders = [
  { label: 'Unknow', value: 'unknow' },
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

const countries = [
  { label: 'South Africa', value: 'southAfrica' },
  { label: 'Zimbabwe', value: 'zimbabwe' },
];

const MainInfoForm: FC = () => {
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  const [gender, setGender] = useState<ValueType>('unknow');
  const [country, setCountry] = useState<ValueType>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { values, errors, touched, handleChange, handleBlur, setValues } =
    useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        dob: '',
        // country: '',
        phoneNumber: '',
      },
      validationSchema: validation,
      onSubmit: () => undefined,
    });

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      dispatch(updateMainInfo({ ...values, gender, country }));
    }
  }, [country, dispatch, errors, gender, values]);

  const visibleToggle = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={'handled'}
      enableResetScrollToCoords={false}
      enableOnAndroid
      style={stylesWithProps.container}>
      <DatePicker
        modal
        mode="date"
        open={isVisible}
        date={new Date()}
        onConfirm={date => {
          visibleToggle();
          setValues({ ...values, dob: format(date, 'dd/MM/yyyy') });
        }}
        onCancel={() => {
          visibleToggle();
        }}
        onDateChange={date =>
          setValues({ ...values, dob: format(date, 'dd/MM/yyyy') })
        }
      />
      <Text style={stylesWithProps.title}>Build your profile.</Text>
      <CustomTextField
        title="First name"
        value={values.firstName}
        touched={touched.firstName}
        errorText={errors.firstName}
        onChangeText={handleChange('firstName')}
        onBlur={handleBlur('firstName')}
      />
      <CustomTextField
        title="Last name"
        value={values.lastName}
        touched={touched.lastName}
        errorText={errors.lastName}
        onChangeText={handleChange('lastName')}
        onBlur={handleBlur('lastName')}
      />
      <View style={stylesWithProps.row}>
        <View style={stylesWithProps.rowItem}>
          <CustomDatePicker
            title="D.O.B"
            value={values.dob}
            onChangeText={handleChange('dob')}
            onBlur={handleBlur('dob')}
            onPress={visibleToggle}
          />
        </View>
        <View style={stylesWithProps.rowItem}>
          <CustomDropDown
            title="Gender"
            items={genders}
            value={gender}
            setValue={setGender}
          />
        </View>
      </View>
      <CustomDropDown
        title="Country"
        items={countries}
        value={country}
        setValue={setCountry}
      />
      <CustomTextField
        title="Phone number"
        value={values.phoneNumber}
        touched={touched.phoneNumber}
        errorText={errors.phoneNumber}
        onChangeText={handleChange('phoneNumber')}
        onBlur={handleBlur('phoneNumber')}
        keyboardType="numeric"
      />
    </KeyboardAwareScrollView>
  );
};

export default MainInfoForm;
