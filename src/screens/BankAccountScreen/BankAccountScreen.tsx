import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ItemType, ValueType } from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BigButton from '../../components/buttons/BigButton/BigButton';
import CustomDropDown from '../../components/inputs/CustomDropDown/CustomDropDown';
import CustomTextField from '../../components/inputs/CustomTextField/CustomTextField';
import styles from './BankAccountScreen.style';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import MainModal from '../../components/modals/MainModal/MainModal';
import { passwordValidation } from '../../utils/validation/validation';
import LittleRedButton from '../../components/buttons/LittleRedButton/LittleRedButton';
import LittleBlackButton from '../../components/buttons/LittleBlackButton/LittleBlackButton';
import { patchDepositAccount } from '../../redux/main/thunks';
import AuthStorageService from '../../utils/AsyncStorageService/AuthStorageService';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import Toaster from '../../components/modals/Toaster/Toaster';
import DiscardChangesModal from '../../components/modals/DiscardChangesModal/DiscardChangesModal';
import {
  EventListenerCallback,
  EventMapCore,
  useNavigation,
} from '@react-navigation/core';
import { StackNavigationState } from '@react-navigation/routers';
import {
  StackNavigationEventMap,
  StackNavigationProp,
} from '@react-navigation/stack/lib/typescript/src/types';
import { SettingParamList } from '../../navigation/SettingNavigation/SettingNavigation';

const validation = yup.object().shape({
  accountName: yup
    .string()
    .required('Account Name required')
    .max(50, 'So Long name'),
  accountNumber: yup.number().required('Account Number required'),
  password: passwordValidation,
});

type NavigationProps = StackNavigationProp<
  SettingParamList,
  'BankAccountScreen'
>;

const BankAccountScreen: FC = () => {
  const navigation = useNavigation<NavigationProps>();
  // redux
  const ownMerchant = useAppSelector(state => state.main.ownMerchant);
  const dispatch = useAppDispatch();

  // memo
  const availableBanks: ItemType[] = useMemo(() => {
    if (!ownMerchant) {
      return [];
    }
    return ownMerchant.available_deposit_banks.map(bank => ({
      label: bank.name,
      value: bank.name,
    }));
  }, [ownMerchant]);

  //state
  const initialBank = ownMerchant?.deposit_account.bank_name ?? '';
  const [selectedBank, setSelectedBank] = useState<ValueType>(initialBank);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [toasterMessage, setToasterMessage] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showDiscard, setShowDiscard] = useState<boolean>(false);

  //formik
  const {
    values,
    errors,
    touched,
    dirty,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: {
      accountName: ownMerchant?.deposit_account.account_name ?? '',
      accountNumber: ownMerchant?.deposit_account.account_number ?? '',
      password: '',
    },
    validationSchema: validation,
    onSubmit: async ({ accountName, accountNumber, password }) => {
      try {
        setLoading(true);
        const savedCred = await AuthStorageService.getAuthFromStorage();
        if (password !== savedCred?.password) {
          return;
        }
        await dispatch(
          patchDepositAccount({
            account_name: accountName,
            account_number: accountNumber,
            bank_name:
              selectedBank.toString() ??
              ownMerchant?.deposit_account.bank_name!,
          }),
        );
        showMessage('Information has been updated');
        setShowModal(false);
      } catch (err: any) {
        console.log('ERR_FROM_ON_SUBMIT', err);
        showMessage('Problem with Server');
      } finally {
        setLoading(false);
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
      const durtyWithDropDown = dirty || initialBank !== selectedBank;

      if (durtyWithDropDown && !showDiscard) {
        event.preventDefault();
        DiscardModalToggle();
      }
    },
    [dirty, initialBank, selectedBank, showDiscard],
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
  const modalToggle = () => {
    setShowModal(prev => !prev);
  };

  const goBackWithReset = () => {
    setToasterMessage('');
    setShowDiscard(false);
    navigation.goBack();
  };

  const showMessage = (text: string) => {
    setToasterMessage(text);
    setTimeout(goBackWithReset, 2000);
  };

  const DiscardModalToggle = () => {
    setShowDiscard(prev => !prev);
  };

  return (
    <View style={styles.container}>
      {isLoading && <CustomLoader />}
      <Toaster visible={!!toasterMessage} type="top" text={toasterMessage} />
      <MainModal isVisible={showModal} onPressOut={modalToggle} type="bottom">
        <KeyboardAwareScrollView style={styles.scrollContainer}>
          <View style={styles.modalContainer}>
            <View style={styles.modalTextContainer}>
              <Text style={styles.modalTitle}>Security check</Text>
              <Text style={styles.modalSubTitle}>
                Please, enter your account password.
              </Text>
            </View>
            <CustomTextField
              title="Account password"
              value={values.password}
              touched={touched.password}
              errorText={errors.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              isSecure
              returnKeyType="done"
            />
            <View style={styles.row}>
              <LittleRedButton title="< Cancel" onPress={modalToggle} />
              <LittleBlackButton title="Apply >" onPress={handleSubmit} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </MainModal>
      <MainModal isVisible={showDiscard} onPressOut={DiscardModalToggle}>
        <DiscardChangesModal
          title="Are you sure you want to discard changes?"
          returnText="No, Return"
          discardText="Yes, Discard"
          onReturn={DiscardModalToggle}
          onDiscard={goBackWithReset}
        />
      </MainModal>
      <KeyboardAwareScrollView scrollEnabled={false}>
        <CustomDropDown
          title="Bank"
          items={availableBanks}
          value={selectedBank}
          setValue={setSelectedBank}
        />
        <CustomTextField
          title="Account Name"
          value={values.accountName}
          touched={touched.accountName}
          errorText={errors.accountName}
          onBlur={handleBlur('accountName')}
          onChangeText={handleChange('accountName')}
        />
        <CustomTextField
          title="Account Number"
          value={values.accountNumber}
          touched={touched.accountNumber}
          errorText={errors.accountNumber}
          onBlur={handleBlur('accountNumber')}
          onChangeText={handleChange('accountNumber')}
          keyboardType="numeric"
          returnKeyType="done"
        />
      </KeyboardAwareScrollView>
      <View style={styles.bottomContainer}>
        <BigButton title="Save" onPress={modalToggle} />
      </View>
    </View>
  );
};

export default BankAccountScreen;
