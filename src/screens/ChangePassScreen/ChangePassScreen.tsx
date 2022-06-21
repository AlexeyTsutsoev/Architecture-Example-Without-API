import React, { FC, useCallback, useEffect, useState } from 'react';
import { Alert, Pressable, View } from 'react-native';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingParamList } from '../../navigation/SettingNavigation/SettingNavigation';
import {
  EventListenerCallback,
  EventMapCore,
  StackNavigationState,
  useNavigation,
} from '@react-navigation/core';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { updatePassword } from '../../redux/main/thunks';

import BigButton from '../../components/buttons/BigButton/BigButton';
import CustomTextField from '../../components/inputs/CustomTextField/CustomTextField';

import { passwordValidation } from '../../utils/validation/validation';
import CloseEye from '../../assets/svgs/eyes/CloseEye.svg';
import OpenEye from '../../assets/svgs/eyes/OpenEye.svg';

import CustomLoader from '../../components/CustomLoader/CustomLoader';
import Toaster from '../../components/modals/Toaster/Toaster';
import styles from './ChangePassScreen.style';
import DiscardChangesModal from '../../components/modals/DiscardChangesModal/DiscardChangesModal';
import MainModal from '../../components/modals/MainModal/MainModal';
import { StackNavigationEventMap } from '@react-navigation/stack/lib/typescript/src/types';

const validation = yup.object().shape({
  currentPass: passwordValidation,
  newPass: passwordValidation.oneOf(
    [yup.ref('confirmPassword'), null],
    'New passwords must match',
  ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPass'), null], 'New passwords must match'),
});

type NavigationProps = StackNavigationProp<
  SettingParamList,
  'ChangePassScreen'
>;

const ChangePassScreen: FC = () => {
  //redux
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.main.isLoading);

  //navigation
  const navigation = useNavigation<NavigationProps>();

  //states
  const [isSecureCurrent, setSecureCurrent] = useState<boolean>(true);
  const [isSecureNew, setSecureNew] = useState<boolean>(true);
  const [isSecureConfirm, setSecureConfirm] = useState<boolean>(true);

  const [text, setText] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

  const [showDiscard, setShowDiscard] = useState<boolean>(false);

  // formik
  const {
    values,
    errors,
    dirty,
    touched,
    submitCount,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      currentPass: '',
      newPass: '',
      confirmPassword: '',
    },
    validationSchema: validation,
    onSubmit: async formVal => {
      try {
        await dispatch(
          updatePassword({
            currentPassword: formVal.currentPass,
            password: formVal.newPass,
          }),
        ).unwrap();

        notifyMessage('Your password has been successfully changed!');
      } catch (err: any) {
        Alert.alert('Something went wrong');
        console.log('ERR_FROM_FROM_UPDATE_PASS', err);
      }
    },
  });

  // callbacks
  const beforeRemoveListener: EventListenerCallback<
    StackNavigationEventMap &
      EventMapCore<StackNavigationState<SettingParamList>>,
    'beforeRemove'
  > = useCallback(
    event => {
      if (dirty && !showDiscard && submitCount === 0) {
        event.preventDefault();
        DiscardModalToggle();
      }
    },
    [dirty, showDiscard, submitCount],
  );

  // effects
  useEffect(() => {
    const listener = navigation.addListener(
      'beforeRemove',
      beforeRemoveListener,
    );

    return listener;
  }, [beforeRemoveListener, navigation]);

  const goBackWithReset = () => {
    setVisible(false);
    setShowDiscard(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'SettingScreen' }],
    });
  };

  const notifyMessage = (msg: string) => {
    setText(msg);
    setVisible(true);
    setTimeout(goBackWithReset, 2000);
  };

  // togglers
  const secureCurrentToggle = () => {
    setSecureCurrent(prev => !prev);
  };

  const secureNewToggle = () => {
    setSecureNew(prev => !prev);
  };

  const secureConfirmToggle = () => {
    setSecureConfirm(prev => !prev);
  };

  const DiscardModalToggle = () => {
    setShowDiscard(prev => !prev);
  };

  // icons
  const getCurrentPasswordIcon = () => (
    <Pressable onPress={secureCurrentToggle}>
      {isSecureCurrent ? <CloseEye /> : <OpenEye />}
    </Pressable>
  );

  const getNewPasswordIcon = () => (
    <Pressable onPress={secureNewToggle}>
      {isSecureNew ? <CloseEye /> : <OpenEye />}
    </Pressable>
  );

  const getConfirmPasswordIcon = () => (
    <Pressable onPress={secureConfirmToggle}>
      {isSecureConfirm ? <CloseEye /> : <OpenEye />}
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <MainModal isVisible={showDiscard} onPressOut={DiscardModalToggle}>
        <DiscardChangesModal
          title="Are you sure you want to discard changes?"
          returnText="No, Return"
          discardText="Yes, Discard"
          onReturn={DiscardModalToggle}
          onDiscard={goBackWithReset}
        />
      </MainModal>
      {isLoading && <CustomLoader />}
      <Toaster visible={visible} text={text} />
      <View style={styles.mainContent}>
        <KeyboardAwareScrollView scrollEnabled={false}>
          <CustomTextField
            title="Current Password"
            value={values.currentPass}
            errorText={errors.currentPass}
            touched={touched.currentPass}
            onChangeText={handleChange('currentPass')}
            onBlur={handleBlur('currentPass')}
            isSecure={isSecureCurrent}
            accessoryRight={getCurrentPasswordIcon}
          />
          <CustomTextField
            title="New Password"
            value={values.newPass}
            errorText={errors.newPass}
            touched={touched.newPass}
            onChangeText={handleChange('newPass')}
            onBlur={handleBlur('newPass')}
            isSecure={isSecureNew}
            accessoryRight={getNewPasswordIcon}
          />
          <CustomTextField
            title="Retype Password"
            value={values.confirmPassword}
            errorText={errors.confirmPassword}
            touched={touched.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            isSecure={isSecureConfirm}
            accessoryRight={getConfirmPasswordIcon}
          />
        </KeyboardAwareScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <BigButton title="Change Password" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default ChangePassScreen;
