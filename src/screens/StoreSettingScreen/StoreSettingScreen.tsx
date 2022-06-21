import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFormik } from 'formik';
import * as yup from 'yup';
import React, { FC, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BigButton from '../../components/buttons/BigButton/BigButton';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import CustomTextField from '../../components/inputs/CustomTextField/CustomTextField';
import Toaster from '../../components/modals/Toaster/Toaster';
import useScale from '../../hooks/useScale';
import { SettingParamList } from '../../navigation/SettingNavigation/SettingNavigation';
import { updateMirror, updateStoreSettings } from '../../redux/main/thunks';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import styles from './StoreSettingScreen.style';
import { urlValidation } from '../../utils/validation/validation';

const validation = yup.object().shape({
  storeName: yup.string().required('Store name is required').max(30, 'To long'),
  storeDescription: yup
    .string()
    .required('Store description is required')
    .max(120, 'To long'),
  instaLink: urlValidation,
  facebookLink: urlValidation,
  shippingFee: yup.number().required('Fee is required'),
});

type NavigationProps = StackNavigationProp<
  SettingParamList,
  'StoreSettingScreen'
>;

const StoreSettingScreen: FC = () => {
  // styles
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  // navigation
  const navigation = useNavigation<NavigationProps>();

  //redux
  const { ownMerchant } = useAppSelector(state => state.main);
  const { bio, instagramUrl, facebookUrl } = useAppSelector(
    state => state.main.user!,
  );

  const dispatch = useAppDispatch();

  // state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toastMesage, setToastMessage] = useState<string>('');

  // formik
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        storeName: ownMerchant?.name ?? '',
        storeDescription: bio ?? '',
        instaLink: instagramUrl ?? '',
        facebookLink: facebookUrl ?? '',
        shippingFee: ownMerchant?.shipping_fee ?? '',
      },
      validationSchema: validation,
      onSubmit: async ({
        shippingFee,
        storeName,
        storeDescription,
        instaLink,
        facebookLink,
      }) => {
        try {
          setIsLoading(true);
          await dispatch(
            updateStoreSettings({
              shipping_fee: shippingFee,
              name: storeName,
            }),
          );
          await dispatch(
            updateMirror({
              bio: storeDescription,
              instagram_url: instaLink,
              facebook_url: facebookLink,
            }),
          );
          showMessage('Information has been successfully updated.');
        } catch (err: any) {
          console.log('ERROR_FROM_SUBMIT_', err);
          showMessage('Somthing went wrong');
        } finally {
          setIsLoading(false);
        }
      },
    });

  // helpers
  const showMessage = (text: string) => {
    setToastMessage(text);
    setTimeout(() => {
      setToastMessage('');
      navigation.goBack();
    }, 2000);
  };

  return (
    <View style={stylesWithProps.container}>
      {isLoading && <CustomLoader />}
      <Toaster text={toastMesage} visible={!!toastMesage} />
      <View style={stylesWithProps.mainContent}>
        <KeyboardAwareScrollView enableOnAndroid>
          <View style={stylesWithProps.row}>
            <View style={stylesWithProps.rowItem}>
              <CustomTextField
                title="Store name"
                value={values.storeName}
                onChangeText={handleChange('storeName')}
                onBlur={handleBlur('storeName')}
                errorText={errors.storeName}
                touched={touched.storeName}
                returnKeyType="done"
                multiline={false}
              />
            </View>
            <View style={stylesWithProps.rowItem}>
              <Text style={stylesWithProps.text}>.boohoo.shop</Text>
            </View>
          </View>
          <CustomTextField
            title="Store Description  (Your fans will read this)"
            value={values.storeDescription}
            onChangeText={handleChange('storeDescription')}
            onBlur={handleBlur('storeDescription')}
            errorText={errors.storeDescription}
            touched={touched.storeDescription}
            multiline
          />
          <CustomTextField
            title="Instagram URL"
            value={values.instaLink}
            onChangeText={handleChange('instaLink')}
            onBlur={handleBlur('instaLink')}
            errorText={errors.instaLink}
            touched={touched.instaLink}
          />
          <CustomTextField
            title="Facebook URL"
            value={values.facebookLink}
            onChangeText={handleChange('facebookLink')}
            onBlur={handleBlur('facebookLink')}
            errorText={errors.facebookLink}
            touched={touched.facebookLink}
          />
          <CustomTextField
            title="Own Products Shipping Fee"
            value={values.shippingFee}
            onChangeText={handleChange('shippingFee')}
            onBlur={handleBlur('shippingFee')}
            errorText={errors.shippingFee}
            touched={touched.shippingFee}
            returnKeyType="done"
            keyboardType="decimal-pad"
          />
        </KeyboardAwareScrollView>
      </View>
      <View style={stylesWithProps.bottomContainer}>
        <BigButton title="Save" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default StoreSettingScreen;
