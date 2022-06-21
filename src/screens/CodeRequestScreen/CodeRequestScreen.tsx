import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import BigButton from '../../components/buttons/BigButton/BigButton';
import CustomTextField from '../../components/inputs/CustomTextField/CustomTextField';
import { RootStackParamList } from '../../navigation/RegistrationNavigator/RegistrationNavigator';
import { useNavigation } from '@react-navigation/native';
import styles from './CodeRequestScreen.style';
import PressableText from '../../components/buttons/PressableText/PressableText';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { requestForSendCode } from '../../redux/main/thunks';
import { addCode } from '../../redux/main/mainReducer';
import CancelText from '../../components/buttons/CancelText/CancelText';

type NavigationProps = StackNavigationProp<
  RootStackParamList,
  'CodeRequestScreen'
>;

const INITIAL_TIMER = 60;

const validation = yup.object().shape({
  code: yup.number().required('Code is required').min(4, '4 chars- minimum'),
});

const CodeRequestScreen: FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const [canSend, setCanSend] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(INITIAL_TIMER);

  const restoreEmail = useAppSelector(state => state.main.restoreCred?.email);
  const dispatch = useAppDispatch();

  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        code: '',
      },
      validationSchema: validation,
      onSubmit: () => {
        dispatch(addCode(values.code));
        navigateWithReset('EnterNewPass');
      },
    });

  useEffect(() => {
    if (canSend) {
      return;
    }

    const interval = setTimeout(() => {
      setTimer(prev => --prev);
    }, 1000);

    if (timer === 0) {
      setCanSend(prev => !prev);
      clearTimeout(interval);
    }

    return () => clearTimeout(interval);
  }, [canSend, timer]);

  const sendNewCode = () => {
    restoreEmail && dispatch(requestForSendCode(restoreEmail));

    setTimer(INITIAL_TIMER);
    setCanSend(prev => !prev);
  };

  const navigateWithReset = (screen: keyof RootStackParamList) => {
    navigation.reset({
      index: 0,
      routes: [{ name: screen }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Check your email for a code number</Text>
        {canSend ? (
          <PressableText title="Send code again." onPress={sendNewCode} />
        ) : (
          <Text style={styles.subTitle}>
            Send again after <Text style={styles.blueText}>00:{timer}</Text>
          </Text>
        )}
      </View>
      <CustomTextField
        title="Code"
        value={values.code}
        onChangeText={handleChange('code')}
        onBlur={handleBlur('code')}
        errorText={errors.code}
        touched={touched.code}
        keyboardType="number-pad"
        returnKeyType="done"
      />
      <View style={styles.bottomContainer}>
        <BigButton title="Reset Password >" onPress={handleSubmit} />
        <CancelText title="Cancel" onPress={() => navigateWithReset('Login')} />
      </View>
    </View>
  );
};

export default CodeRequestScreen;
