import React, { FC, useMemo, useState } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import CustomTextField from '../../components/inputs/CustomTextField/CustomTextField';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  emailValidation,
  passwordValidation,
} from '../../utils/validation/validation';
import CloseEye from '../../assets/svgs/eyes/CloseEye.svg';
import OpenEye from '../../assets/svgs/eyes/OpenEye.svg';
import BigButton from '../../components/buttons/BigButton/BigButton';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RegistrationNavigator/RegistrationNavigator';
import styles from './SignUpScreen.style';
import useScale from '../../hooks/useScale';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { startSignUp } from '../../redux/main/thunks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomLoader from '../../components/CustomLoader/CustomLoader';

const validation = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

type NavigationProps = StackNavigationProp<RootStackParamList, 'SignUpScreen'>;

const SignUpScreen: FC = () => {
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.main.isLoading);

  const navigation = useNavigation<NavigationProps>();

  const [securePass, setSecurePass] = useState<boolean>(true);
  const [securePassConfirm, setSecurePassConfirm] = useState<boolean>(true);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
        confirmPassword: '',
      },
      validationSchema: validation,
      onSubmit: async ({ email, password }) => {
        try {
          await dispatch(startSignUp({ username: email, password })).unwrap();
          navigation.reset({ index: 0, routes: [{ name: 'BuildProfile' }] });
        } catch (err: any) {
          console.log('ERROR_FROM_SIGNUP_FORM_', err);
          Alert.alert(err.errors[0]);
        }
      },
    });

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const securePassToggle = () => {
    setSecurePass(prev => !prev);
  };

  const securePassConfirmToggle = () => {
    setSecurePassConfirm(prev => !prev);
  };

  const getSecureIcon = (isConfirm: boolean) => {
    if (isConfirm) {
      return (
        <Pressable onPress={securePassConfirmToggle}>
          {securePassConfirm ? <CloseEye /> : <OpenEye />}
        </Pressable>
      );
    }
    return (
      <Pressable onPress={securePassToggle}>
        {securePass ? <CloseEye /> : <OpenEye />}
      </Pressable>
    );
  };

  return (
    <View style={stylesWithProps.container}>
      <Text style={stylesWithProps.title}>
        {'Welcome to your\nBoohoo Micro-Store'}
      </Text>
      {isLoading && <CustomLoader />}
      <View style={stylesWithProps.mainContent}>
        <KeyboardAwareScrollView enableOnAndroid>
          <CustomTextField
            title="Email"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            errorText={errors.email}
            touched={touched.email}
          />
          <CustomTextField
            title="Password"
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            errorText={errors.password}
            touched={touched.password}
            accessoryRight={() => getSecureIcon(false)}
          />
          <CustomTextField
            title="Confirm Password"
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            errorText={errors.confirmPassword}
            touched={touched.confirmPassword}
            accessoryRight={() => getSecureIcon(true)}
          />
        </KeyboardAwareScrollView>
      </View>
      <View style={stylesWithProps.bottomContainer}>
        <BigButton title="Sign Up >" onPress={handleSubmit} />
        <BigButton
          title="Sign In with another account >"
          onPress={navigateToLogin}
          type="secundary"
        />
        <Text style={stylesWithProps.bottomText}>Powered by 411Gen</Text>
      </View>
    </View>
  );
};

export default SignUpScreen;
