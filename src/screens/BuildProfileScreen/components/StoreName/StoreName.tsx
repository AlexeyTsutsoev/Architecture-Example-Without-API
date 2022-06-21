import React, { FC, useEffect, useMemo } from 'react';
import { Text, View } from 'react-native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import CustomTextField from '../../../../components/inputs/CustomTextField/CustomTextField';
import { useAppDispatch } from '../../../../redux/store';
import { updateStoreInfo } from '../../store/reducer';
import styles from './StoreName.style';
import useScale from '../../../../hooks/useScale';

const validation = yup.object().shape({
  storeName: yup.string().required('name is required'),
  storeDecription: yup.string().required('Description is required'),
});

const StoreName: FC = () => {
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  const dispatch = useAppDispatch();
  const { values, errors, touched, handleChange, handleBlur } = useFormik({
    initialValues: {
      storeName: '',
      storeDecription: '',
    },
    validationSchema: validation,
    onSubmit: () => undefined,
  });

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      dispatch(updateStoreInfo(values));
    }
  }, [dispatch, errors, values]);

  return (
    <View>
      <Text style={stylesWithProps.title}>Build your profile.</Text>
      <View style={stylesWithProps.row}>
        <View style={stylesWithProps.rowItem}>
          <CustomTextField
            title="Store name"
            value={values.storeName}
            touched={touched.storeName}
            errorText={errors.storeName}
            onChangeText={handleChange('storeName')}
            onBlur={handleBlur('storeName')}
          />
        </View>
        <Text style={[stylesWithProps.rowItem, stylesWithProps.textMargin]}>
          .boohoo.shop
        </Text>
      </View>
      <CustomTextField
        title="Store Description (Your fans will read this)"
        value={values.storeDecription}
        touched={touched.storeDecription}
        errorText={errors.storeDecription}
        onChangeText={handleChange('storeDecription')}
        onBlur={handleBlur('storeDecription')}
        multiline={true}
      />
    </View>
  );
};

export default StoreName;
