import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';

import { updateUserInfo } from '../../redux/main/thunks';
import {
  EventListenerCallback,
  EventMapCore,
  StackNavigationState,
  useNavigation,
} from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingParamList } from '../../navigation/SettingNavigation/SettingNavigation';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import useScale from '../../hooks/useScale';

import CustomTextField from '../../components/inputs/CustomTextField/CustomTextField';
import BigButton from '../../components/buttons/BigButton/BigButton';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import Toaster from '../../components/modals/Toaster/Toaster';

import {
  emailValidation,
  lastNameValidation,
  nameValidation,
  phoneValidation,
} from '../../utils/validation/validation';
import styles from './ProfileSettingScreen.style';
import DiscardChangesModal from '../../components/modals/DiscardChangesModal/DiscardChangesModal';
import MainModal from '../../components/modals/MainModal/MainModal';
import { StackNavigationEventMap } from '@react-navigation/stack/lib/typescript/src/types';
import { Masks } from 'react-native-mask-input';

type NavigationProps = StackNavigationProp<
  SettingParamList,
  'ProfileSettingScreen'
>;

const validation = yup.object().shape({
  firstName: nameValidation,
  lastName: lastNameValidation,
  phoneNumber: phoneValidation,
  email: emailValidation,
});

const ProfileSettingScreen: FC = () => {
  // styles
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  // state
  const [text, setText] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [showDiscard, setShowDiscard] = useState<boolean>(false);

  //navigation
  const navigation = useNavigation<NavigationProps>();

  // redux
  const user = useAppSelector(state => state.main.user);
  const isLoad = useAppSelector(state => state.main.isLoading);
  const dispatch = useAppDispatch();

  // formik
  const {
    values,
    errors,
    touched,
    dirty,
    submitCount,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      phoneNumber: user?.phoneNumer,
      email: user?.email,
    },
    validationSchema: validation,
    onSubmit: async formVal => {
      try {
        await dispatch(updateUserInfo(formVal));
        startMessage('Information successful update');
      } catch (err: any) {
        Alert.alert("Can't update information");
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

  // helpers
  const goBackWithReset = () => {
    setVisible(false);
    setShowDiscard(false);
    navigation.goBack();
  };

  const DiscardModalToggle = () => {
    setShowDiscard(prev => !prev);
  };

  const startMessage = (msg: string) => {
    setText(msg);
    setVisible(true);
    setTimeout(goBackWithReset, 2000);
  };

  return (
    <View style={stylesWithProps.container}>
      {isLoad && <CustomLoader />}
      <Toaster visible={visible} text={text} />
      <MainModal isVisible={showDiscard} onPressOut={DiscardModalToggle}>
        <DiscardChangesModal
          title="Are you sure you want to discard changes?"
          returnText="No, Return"
          discardText="Yes, Discard"
          onReturn={DiscardModalToggle}
          onDiscard={goBackWithReset}
        />
      </MainModal>
      <View style={stylesWithProps.scrollContainer}>
        <KeyboardAwareScrollView enableOnAndroid style={stylesWithProps.scroll}>
          <CustomTextField
            title="First Name"
            value={values.firstName ?? ''}
            errorText={errors.firstName}
            touched={touched.firstName}
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
          />
          <CustomTextField
            title="Last Name"
            value={values.lastName ?? ''}
            errorText={errors.lastName}
            touched={touched.lastName}
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
          />
          <CustomTextField
            title="Email"
            value={values.email ?? ''}
            errorText={errors.email}
            touched={touched.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
          />
          <CustomTextField
            title="Phone Number"
            value={values.phoneNumber ?? ''}
            errorText={errors.phoneNumber}
            touched={touched.phoneNumber}
            onChangeText={handleChange('phoneNumber')}
            onBlur={handleBlur('phoneNumber')}
            mask={Masks.BRL_PHONE}
            keyboardType="number-pad"
            returnKeyType="done"
          />
        </KeyboardAwareScrollView>
      </View>
      <View style={stylesWithProps.bottomContainer}>
        <BigButton title="Save" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default ProfileSettingScreen;
