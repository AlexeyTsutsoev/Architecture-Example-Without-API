import React, { FC, useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RegistrationNavigator/RegistrationNavigator';
import { useFormik } from 'formik';
import * as yup from 'yup';
import BigButton from '../../components/buttons/BigButton/BigButton';
import PressableText from '../../components/buttons/PressableText/PressableText';
import CustomTextField from '../../components/inputs/CustomTextField/CustomTextField';
import styles from './LoginScreen.style';
import {
  emailValidation,
  passwordValidation,
} from '../../utils/validation/validation';
import CloseEye from '../../assets/svgs/eyes/CloseEye.svg';
import OpenEye from '../../assets/svgs/eyes/OpenEye.svg';
import { login } from '../../redux/main/thunks';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import SplashScreen from '../SplashScreen/SplashScreen';
import useScale from '../../hooks/useScale';

const validation = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});

type NavigationProps = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: FC = () => {
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();
  const isLoad = useAppSelector(state => state.main.isLoading);
  const [isSecure, setSecure] = useState<boolean>(true);
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
      email: 'tami@khoyn.com',
      password: 'pavellogin123',
    },
    initialTouched: {
      email: false,
      password: false,
    },
    validationSchema: validation,
    onSubmit: async ({ email, password }) => {
      try {
        await dispatch(
          login({
            username: email,
            password,
          }),
        ).unwrap();

        resetForm();
      } catch (err: any) {
        console.log('ERROR_FROM_FORM', err);
        Alert.alert('AUTH ERROR', err.message);
      }
    },
  });

  const secureToggle = () => {
    setSecure(prev => !prev);
  };

  const getEyeIcon = () => (
    <Pressable onPress={secureToggle}>
      {isSecure ? <CloseEye /> : <OpenEye />}
    </Pressable>
  );

  const navigateToRestoreCred = () => {
    navigation.navigate('RestoreCredScreen');
  };

  const moveToInvite = async () => {
    // await Linking.openURL(
    //   'https://khoyn.page.link/?link=http://dashboard.khoyn.test:5000/invitation/accept?invitation_token=4Rt5wLn4tF8x3D3suhcX&apn=com.khoyn.khoynsellers.resell&amv=70001',
    // );
    navigation.navigate('SignUpScreen');
  };

  if (isLoad) {
    return <SplashScreen />;
  }

  return (
    <View style={stylesWithProps.container}>
      <Text style={stylesWithProps.title}>
        {'Welcome to your \nBoohoo Micro-Store.'}
      </Text>
      <View style={stylesWithProps.inviteContainer}>
        <View style={stylesWithProps.row}>
          <Text style={stylesWithProps.mainText}>Didn’t Get Invite?</Text>
          <PressableText title="Click Here." onPress={moveToInvite} />
        </View>
        <View style={stylesWithProps.row}>
          <Text style={stylesWithProps.mainText}>Credentials not working?</Text>
          <PressableText title="Click Here." onPress={navigateToRestoreCred} />
        </View>
      </View>
      <View style={stylesWithProps.inputsContainer}>
        <KeyboardAvoidingView behavior="padding">
          <CustomTextField
            title="Email"
            value={values.email}
            touched={touched.email}
            errorText={errors.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
          />
          <CustomTextField
            title="Password"
            value={values.password}
            touched={touched.password}
            errorText={errors.password}
            isSecure={isSecure}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            accessoryRight={getEyeIcon}
          />
        </KeyboardAvoidingView>
      </View>
      <View style={stylesWithProps.bottomContainer}>
        <BigButton type="black" title="Sign In >" onPress={handleSubmit} />
        <Text style={stylesWithProps.bottomText}>Powered by 411Gen</Text>
      </View>
    </View>
  );
};

export default LoginScreen;
