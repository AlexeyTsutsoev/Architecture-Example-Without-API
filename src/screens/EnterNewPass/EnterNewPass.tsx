import React, { FC, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { passwordValidation } from '../../utils/validation/validation';
import CustomTextField from '../../components/inputs/CustomTextField/CustomTextField';
import BigButton from '../../components/buttons/BigButton/BigButton';
import MainModal from '../../components/modals/MainModal/MainModal';
import PressableText from '../../components/buttons/PressableText/PressableText';
import { RootStackParamList } from '../../navigation/RegistrationNavigator/RegistrationNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import CheckIcon from '../../assets/svgs/ModalIcons/CheckIcon.svg';
import CloseEye from '../../assets/svgs/eyes/CloseEye.svg';
import OpenEye from '../../assets/svgs/eyes/OpenEye.svg';
import styles from './EnterNewPass.style';
import { useAppSelector } from '../../redux/store';
import { requestResetPassword } from '../../API/user';

const validation = yup.object().shape({
  password: passwordValidation,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

type NavigationProps = StackNavigationProp<RootStackParamList, 'EnterNewPass'>;

const EnterNewPass: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [securePass, setSecurePass] = useState<boolean>(true);
  const [secureConfirmPass, setSecureCofirmPass] = useState<boolean>(true);

  const navigation = useNavigation<NavigationProps>();

  const restore = useAppSelector(state => state.main.restoreCred);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        password: '',
        confirmPassword: '',
      },
      validationSchema: validation,
      onSubmit: async formValues => {
        try {
          if (!restore?.id || !restore?.code) {
            throw new Error('code or your id is missing');
          }
          requestResetPassword(
            formValues.confirmPassword,
            restore.code,
            restore.id,
          );
          modalToggle();
        } catch (err: any) {
          Alert.alert('Restore password error', err.message);
        }
      },
    });

  const modalToggle = () => {
    setShowModal(prev => !prev);
  };

  const navigateToLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const securePassToggle = () => {
    setSecurePass(prev => !prev);
  };

  const securePassConfirmToggle = () => {
    setSecureCofirmPass(prev => !prev);
  };

  const getSecureIcon = (isConfirm: boolean) => {
    if (isConfirm) {
      return (
        <Pressable onPress={securePassConfirmToggle}>
          {secureConfirmPass ? <CloseEye /> : <OpenEye />}
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
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>Enter new password</Text>
        <Text style={styles.subtitle}>
          Your new password must be different from previous used passwords.
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <CustomTextField
          title="Password"
          value={values.password}
          errorText={errors.password}
          touched={touched.password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          isSecure={securePass}
          accessoryRight={() => getSecureIcon(false)}
        />
        <CustomTextField
          title="Confirm Password"
          value={values.confirmPassword}
          errorText={errors.confirmPassword}
          touched={touched.confirmPassword}
          onChangeText={handleChange('confirmPassword')}
          onBlur={handleBlur('confirmPassword')}
          isSecure={securePass}
          accessoryRight={() => getSecureIcon(true)}
        />
      </View>
      <View style={styles.itemContainer}>
        <BigButton title="Save new password >" onPress={handleSubmit} />
        <Text style={styles.bottomText}>Powered by 411Gen</Text>
      </View>
      <MainModal isVisible={showModal} onPressOut={modalToggle} type="center">
        <View style={styles.modalContainer}>
          <CheckIcon />
          <Text style={styles.modalText}>
            Your password was successfully changed.
          </Text>
          <PressableText
            title="Sign In with the new password"
            onPress={navigateToLogin}
          />
        </View>
      </MainModal>
    </View>
  );
};

export default EnterNewPass;
