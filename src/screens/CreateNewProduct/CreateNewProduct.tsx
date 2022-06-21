import React, { FC, useMemo, useState } from 'react';
import { Alert, FlatList, ListRenderItemInfo, Text, View } from 'react-native';

import { useAppSelector } from '../../redux/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { useFormik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import { ValueType } from 'react-native-dropdown-picker';

import useScale from '../../hooks/useScale';
import SplashScreen from '../SplashScreen/SplashScreen';
import { createNewProductToDB } from '../../API/taxons';

import CustomTextField from '../../components/inputs/CustomTextField/CustomTextField';
import LittleRedButton from '../../components/buttons/LittleRedButton/LittleRedButton';
import LittleBlackButton from '../../components/buttons/LittleBlackButton/LittleBlackButton';
import { StoreStackParamList } from '../../navigation/StoreNavigation/StoreNavigation';
import CustomDropDown from '../../components/inputs/CustomDropDown/CustomDropDown';
import BubbleComponent from '../../components/UIComponents/BubbleComponent/BubbleComponent';
import BigButton from '../../components/buttons/BigButton/BigButton';
import MainModal from '../../components/modals/MainModal/MainModal';
import CategoryModal from '../../components/modals/CategoryModal/CategoryModal';
import LoadImage from '../../components/buttons/LoadImage/LoadImage';

import styles from './CreateNewProduct.style';

const validation = yup.object().shape({
  name: yup.string().required('Product Name is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required'),
});

type NavigationProps = StackNavigationProp<
  StoreStackParamList,
  'AddNewProduct'
>;

const sizes = [
  { label: 'XS', value: 'xs' },
  { label: 'S', value: 's' },
  { label: 'M', value: 'm' },
  { label: 'L', value: 'l' },
  { label: 'XL', value: 'xl' },
  { label: 'XXL', value: 'xxl' },
];

const CreateNewProduct: FC = () => {
  // styles
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  // navigation
  const navigation = useNavigation<NavigationProps>();

  // redux
  const { categories } = useAppSelector(state => state.products);
  const { user, ownMerchant } = useAppSelector(state => state.main);

  const currentMerchantId = useMemo(() => {
    if (ownMerchant) {
      return ownMerchant.id;
    }
    return user?.merchats?.find(merch => merch.role_name === 'owner')
      ?.merchant_id;
  }, [ownMerchant, user]);

  // state
  const [selectedSizes, setSelectedSizes] = useState<ValueType[]>([]);
  const [modalVisible, setVisible] = useState<boolean>(false);
  const [intermediateCategory, setIntermediateCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string>('');

  // formik
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: '',
        description: '',
        price: '',
      },
      validationSchema: validation,
      onSubmit: async ({ name, description, price }) => {
        try {
          setIsLoading(true);
          await createNewProductToDB(currentMerchantId ?? '', {
            name,
            description,
            price,
            taxons: [intermediateCategory],
          });
        } catch (err: any) {
          console.log('ERROR_FROM_HANDLE_SUBMIT_', err);
          console.log('err', err.response.data.errors);
          Alert.alert(err.response.data.errors[0]);
        } finally {
          setIsLoading(false);
        }
      },
    });

  // hendlers
  const goBack = () => {
    navigation.goBack();
  };

  const removeFromSelected = (item: ValueType) => {
    setSelectedSizes(prev => prev.filter(i => i !== item));
  };

  const radioAction = (str: string) => {
    setIntermediateCategory(str);
  };

  const modalToggle = () => {
    setVisible(prev => !prev);
  };

  const cancelCategorues = () => {
    const current = categories?.allCategories[intermediateCategory];
    if (!current) {
      setIntermediateCategory('');
      modalToggle();
      return;
    }
    const parentId = current.parentId;
    const parent = categories?.allCategories[parentId ?? ''];

    if (!parent?.parentId) {
      setIntermediateCategory('');
      return;
    }
    setIntermediateCategory(parent.parentId);
  };

  const getBtnText = () => {
    return (
      categories?.allCategories[intermediateCategory]?.name ?? 'Select Category'
    );
  };

  const renderItem = ({ item }: ListRenderItemInfo<ValueType>) => {
    return (
      <BubbleComponent
        title={item.toString()}
        onPress={() => removeFromSelected(item)}
      />
    );
  };

  const addPhoto = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.assets) {
        if (response.assets[0].uri) {
          setImage(response.assets[0].uri);
        }
      }
    });
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <View style={stylesWithProps.container}>
      <MainModal isVisible={modalVisible} onPressOut={modalToggle}>
        <CategoryModal
          intermediateCategory={intermediateCategory}
          radioAction={radioAction}
          modalToggle={modalToggle}
          cancelCategorues={cancelCategorues}
        />
      </MainModal>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={stylesWithProps.scrollContainer}>
        <Text style={stylesWithProps.title}>Adding a new product</Text>
        <Text style={stylesWithProps.subTitle}>
          {'You can now list your own products to sell \n on your mirror.'}
        </Text>
        <CustomTextField
          title="Product name"
          value={values.name}
          touched={touched.name}
          errorText={errors.name}
          onBlur={handleBlur('name')}
          onChangeText={handleChange('name')}
        />
        <CustomTextField
          title="Description"
          value={values.description}
          touched={touched.description}
          errorText={errors.description}
          onBlur={handleBlur('description')}
          onChangeText={handleChange('description')}
        />
        <CustomTextField
          title="Price"
          value={values.price}
          touched={touched.price}
          errorText={errors.price}
          onBlur={handleBlur('price')}
          onChangeText={handleChange('price')}
          keyboardType="numeric"
          returnKeyType="done"
        />
        <View style={stylesWithProps.btnWrapper}>
          <BigButton
            title={getBtnText()}
            onPress={modalToggle}
            type="secundary"
          />
        </View>
        <CustomDropDown
          title="Size (start writing to see suggestions)"
          items={sizes}
          value={selectedSizes}
          setValue={setSelectedSizes}
          multiple
        />
        <FlatList
          style={stylesWithProps.sizesWrapper}
          showsHorizontalScrollIndicator={false}
          data={selectedSizes}
          renderItem={renderItem}
          horizontal
        />
        <LoadImage imageUri={image} showLoader={false} onPress={addPhoto} />
      </KeyboardAwareScrollView>
      <View style={stylesWithProps.row}>
        <LittleRedButton title="< Cancel" onPress={goBack} />
        <LittleBlackButton title="Add >" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default CreateNewProduct;
