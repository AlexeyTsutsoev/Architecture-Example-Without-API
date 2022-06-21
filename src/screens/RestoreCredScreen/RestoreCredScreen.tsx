import React, { FC, useMemo } from 'react';
import { Alert, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { RootStackParamList } from '../../navigation/RegistrationNavigator/RegistrationNavigator';
import { emailValidation } from '../../utils/validation/validation';
import CustomTextField from '../../components/inputs/CustomTextField/CustomTextField';
import BigButton from '../../components/buttons/BigButton/BigButton';
import styles from './RestoreCredScreen.style';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../redux/store';
import { setIsLoading } from '../../redux/main/mainReducer';
import useScale from '../../hooks/useScale';
import { requestForSendCode } from '../../redux/main/thunks';
import CancelText from '../../components/buttons/CancelText/CancelText';

type NavigationProps = StackNavigationProp<
  RootStackParamList,
  'RestoreCredScreen'
>;

const validation = yup.object().shape({
  email: emailValidation,
});

const RestoreCredScreen: FC = () => {
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();
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
      email: '',
    },
    validationSchema: validation,
    onSubmit: async ({ email }) => {
      try {
        dispatch(setIsLoading(true));
        await dispatch(requestForSendCode(email));
        navigateWithReset('CodeRequestScreen');
      } catch (err: any) {
        console.log('REQUEST_FOR_SEND_CODE_ERROR', err);
        Alert.alert('Reset password error', err.response.data.errors[0] || '', [
          { text: 'Ok', onPress: () => resetForm() },
        ]);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
  });

  const navigateWithReset = (screen: keyof RootStackParamList) => {
    navigation.reset({
      index: 0,
      routes: [{ name: screen }],
    });
  };

  return (
    <View style={stylesWithProps.container}>
      <View style={stylesWithProps.textContainer}>
        <Text style={stylesWithProps.title}>Enter your email</Text>
        <Text style={stylesWithProps.subTitle}>
          We will send you a code number to reset your password.
        </Text>
      </View>
      <CustomTextField
        title="Email"
        value={values.email}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        touched={touched.email}
        errorText={errors.email}
      />
      <View style={stylesWithProps.bottomContainer}>
        <BigButton title="Get code >" onPress={handleSubmit} />
        <CancelText title="Cancel" onPress={() => navigateWithReset('Login')} />
      </View>
    </View>
  );
};

export default RestoreCredScreen;
