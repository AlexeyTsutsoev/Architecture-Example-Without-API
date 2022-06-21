import React, { FC, useMemo, useState } from 'react';
import {
  Alert,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  View,
} from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  createNewAddress,
  udateAddressRequest,
} from '../../redux/addresses/thunk';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { ItemType, ValueType } from 'react-native-dropdown-picker';
import CustomDropDown from '../../components/inputs/CustomDropDown/CustomDropDown';

import {
  emailValidation,
  phoneValidation,
} from '../../utils/validation/validation';

import LittleBlackButton from '../../components/buttons/LittleBlackButton/LittleBlackButton';
import LittleRedButton from '../../components/buttons/LittleRedButton/LittleRedButton';
import CustomTextField from '../../components/inputs/CustomTextField/CustomTextField';
import { SettingParamList } from '../../navigation/SettingNavigation/SettingNavigation';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import Toaster from '../../components/modals/Toaster/Toaster';

import styles from './AddressInfoFormScreen.syle';

type CustomRouteProps = RouteProp<SettingParamList, 'AddressInfoFormScreen'>;
type NavigationProps = StackNavigationProp<
  SettingParamList,
  'AddressInfoFormScreen'
>;

const validation = yup.object().shape({
  fullName: yup.string().required('Full name is required').max(50, 'So Long'),
  email: emailValidation,
  phoneNumber: phoneValidation,
  addressLine: yup
    .string()
    .required('Address line is Required')
    .max(250, 'Address line has a limit of 250 characters'),
  city: yup
    .string()
    .required('City is Required')
    .max(30, 'City has a limit of 250 characters'),
  country: yup.string().required('Country is Required'),
});

type FormikValues = {
  fullName: string;
  email: string;
  phoneNumber: string;
  addressLine: string;
  city: string;
  province: string;
  country: string;
};

type FieldProps = {
  title: string;
  value: string;
  touched?: boolean;
  errorText?: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: Event) => void;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
};

const AddressInfoFormScreen: FC = () => {
  // navigation
  const { params } = useRoute<CustomRouteProps>();
  const navigation = useNavigation<NavigationProps>();
  const address = params?.address;

  // redux
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.main.user);
  const { provinces } = useAppSelector(state => state.addresses);
  const mapedProvinces: ItemType[] = useMemo(() => {
    if (!provinces) {
      return [];
    }
    return provinces?.map(province => ({
      value: province.name,
      label: province.name,
    }));
  }, [provinces]);

  // state
  const [isLoading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [selectedProvince, setSelectedProvince] = useState<ValueType>(
    address?.province ?? '',
  );

  // formik
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      fullName: address?.fullName ?? '',
      email: address?.email ?? '',
      phoneNumber: address?.phone ?? '',
      addressLine: address?.address1 ?? '',
      city: address?.city ?? '',
      country: address?.country ?? 'South Africa',
    },
    validationSchema: validation,
    onSubmit: async formValues => {
      try {
        setLoading(true);
        const firstName = formValues.fullName.split(' ')[0];
        const lastName = formValues.fullName.split(' ')[1] ?? 'No Last Name';
        if (address && address.id) {
          await dispatchUpdateAddress(
            { ...formValues, province: selectedProvince.toString() },
            firstName,
            lastName,
          );

          return;
        }

        await dispatchNewAddress(
          { ...formValues, province: selectedProvince.toString() },
          firstName,
          lastName,
        );
      } catch (err: any) {
        throw new Error('ERR_FROM_ONSUBMIT');
      } finally {
        setLoading(false);
      }
    },
  });

  // memoize
  const fields: FieldProps[] = useMemo(
    () => [
      {
        title: 'Full Name',
        value: values.fullName,
        touched: touched.fullName,
        errorText: errors.fullName,
        onChangeText: handleChange('fullName'),
        onBlur: handleBlur('fullName'),
      },
      {
        title: 'Phone Number',
        value: values.phoneNumber,
        touched: touched.phoneNumber,
        errorText: errors.phoneNumber,
        onChangeText: handleChange('phoneNumber'),
        onBlur: handleBlur('phoneNumber'),
        keyboardType: 'numeric',
        returnKeyType: 'done',
      },
      {
        title: 'Email',
        value: values.email,
        touched: touched.email,
        errorText: errors.email,
        onChangeText: handleChange('email'),
        onBlur: handleBlur('email'),
      },
      {
        title: 'Address Line',
        value: values.addressLine,
        touched: touched.addressLine,
        errorText: errors.addressLine,
        onChangeText: handleChange('addressLine'),
        onBlur: handleBlur('addressLine'),
      },
      {
        title: 'City',
        value: values.city,
        touched: touched.city,
        errorText: errors.city,
        onChangeText: handleChange('city'),
        onBlur: handleBlur('city'),
      },
      // {
      //   title: 'Province',
      //   value: values.province,
      //   touched: touched.province,
      //   errorText: errors.province,
      //   onChangeText: handleChange('province'),
      //   onBlur: handleBlur('province'),
      // },
      {
        title: 'Country',
        value: values.country,
        touched: touched.country,
        errorText: errors.country,
        // onChangeText: handleChange('country'), temp comment
        onChangeText: () => null,
        onBlur: handleBlur('country'),
      },
    ],
    [values, touched, errors, handleBlur, handleChange],
  );

  // hendlers
  const goBack = () => {
    setVisible(false);
    navigation.goBack();
  };

  const startMessage = (msg: string) => {
    setText(msg);
    setVisible(true);
    setTimeout(goBack, 2000);
  };

  const dispatchNewAddress = async (
    { addressLine, city, country, province, phoneNumber, email }: FormikValues,
    firstName: string,
    lastName: string,
  ) => {
    try {
      await dispatch(
        createNewAddress({
          user_id: user?.id!,
          address: {
            first_name: firstName,
            last_name: lastName,
            address1: addressLine,
            city,
            province,
            country,
            phone: phoneNumber,
            email,
          },
        }),
      );

      startMessage('Successfully created!');
    } catch (err: any) {
      Alert.alert('Failed to create a new address');
      resetForm();
    }
  };

  const dispatchUpdateAddress = async (
    { addressLine, city, province, country, phoneNumber, email }: FormikValues,
    firstName: string,
    lastName: string,
  ) => {
    try {
      if (address && address.id) {
        await dispatch(
          udateAddressRequest({
            id: address.id,
            payload: {
              user_id: user?.id!,
              address: {
                first_name: firstName,
                last_name: lastName,
                address1: addressLine,
                address2: 'test',
                city,
                province,
                country,
                phone: phoneNumber,
                email,
              },
            },
          }),
        );

        startMessage('Your address has been successfully updated!');
      }
    } catch (err: any) {
      Alert.alert('Failed to update address');
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <CustomLoader />}
      <Toaster visible={visible} text={text} />
      <View style={styles.mainContent}>
        <KeyboardAwareScrollView enableOnAndroid>
          <CustomDropDown
            title="Province"
            items={mapedProvinces}
            value={selectedProvince}
            setValue={setSelectedProvince}
          />
          {fields.map(field => (
            <CustomTextField
              key={field.title}
              title={field.title}
              value={field.value}
              touched={field.touched}
              errorText={field.errorText}
              onChangeText={field.onChangeText}
              onBlur={field.onBlur}
              keyboardType={field.keyboardType}
              returnKeyType={field.returnKeyType}
            />
          ))}
        </KeyboardAwareScrollView>
      </View>
      <View style={[styles.bottomContainer, styles.row]}>
        <LittleRedButton title="< Cancel" onPress={goBack} />
        <LittleBlackButton title="Apply >" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default AddressInfoFormScreen;
