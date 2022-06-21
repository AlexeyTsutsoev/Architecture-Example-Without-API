import React, { FC, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Linking,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import useScale from '../../hooks/useScale';
import { SettingParamList } from '../../navigation/SettingNavigation/SettingNavigation';
import { setColor } from '../../redux/main/mainReducer';
import { updateMirror } from '../../redux/main/thunks';
import { urlValidation } from '../../utils/validation/validation';
import { patchThemeSettings } from '../../API/user';

import CustomTextField from '../../components/inputs/CustomTextField/CustomTextField';
import BigButton from '../../components/buttons/BigButton/BigButton';
import LittleRedButton from '../../components/buttons/LittleRedButton/LittleRedButton';
import LittleBlackButton from '../../components/buttons/LittleBlackButton/LittleBlackButton';
import MainModal from '../../components/modals/MainModal/MainModal';
import ColorModal from './components/ColorModal/ColorModal';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import Toaster from '../../components/modals/Toaster/Toaster';

import Facebook from '../../assets/svgs/socWebIcons/Facebook.svg';
import Instagram from '../../assets/svgs/socWebIcons/Instagram.svg';
import PlusIcon from '../../assets/svgs/general/PlusIcon.svg';
import styles from './EditMirrorScreen.style';
import LoadImage from '../../components/buttons/LoadImage/LoadImage';

type NavigationProps = StackNavigationProp<
  SettingParamList,
  'EditMirrorScreen'
>;

const validation = yup.object().shape({
  facebook: urlValidation,
  instagram: urlValidation,
  description: yup
    .string()
    .required('Description must be filled')
    .max(120, '120 chars- maximum!'),
  mirror: yup.string().required('Mirror must be filled'),
});

const EditMirrorScreen: FC = () => {
  // navigation
  const navigation = useNavigation<NavigationProps>();

  const goBack = () => {
    navigation.goBack();
  };

  // scale
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  // redux
  const dispacth = useAppDispatch();
  const yourMerchant = useAppSelector(state =>
    state.main.user?.merchats?.find(merch => merch.role_name === 'owner'),
  );
  const { facebookUrl, instagramUrl, bio, mirrorLink, picture } =
    useAppSelector(state => state.main.user!);

  //formik
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        facebook: facebookUrl ?? '',
        instagram: instagramUrl ?? '',
        description: bio ?? '',
        mirror: mirrorLink.split('.')[0].split('//')[1] ?? '',
      },
      validationSchema: validation,
      onSubmit: async ({ mirror, description, facebook, instagram }) => {
        try {
          setLoading(true);
          const { status } = await patchThemeSettings(
            yourMerchant?.merchant_id!,
            selectedColour,
          );
          if (status === 200) {
            dispacth(setColor(selectedColour));
          }
          await dispacth(
            updateMirror({
              mirror_url: mirror + domain,
              facebook_url: facebook,
              instagram_url: instagram,
              bio: description,
            }),
          );
          onEndApply();
        } catch (err: any) {
          console.log('REQUEST_ERR', err);
          Alert.alert('Some problem with server', err);
        } finally {
          setLoading(false);
        }
      },
    });

  //state
  const [image, setImage] = useState<string>(picture ?? '');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [showToaster, setShowToaster] = useState<boolean>(false);
  const [isVisible, setVisible] = useState<boolean>(false);
  const [selectedColour, setSelectedColour] = useState<string>(
    yourMerchant?.theme_settings.mirror_colour ?? '',
  );

  //memo
  const colors = useMemo(() => {
    return [selectedColour, '#B131FF', '#216628', '#3183FF'];
  }, [selectedColour]);

  const domain = useMemo(
    () => `${mirrorLink.split('.')[1] ?? '.knoyn'}.it`,
    [mirrorLink],
  );

  // helpers
  const visibleToggle = () => {
    setVisible(prev => !prev);
  };

  const getBallStyles = (color: string): ViewStyle[] => {
    return [stylesWithProps.ball, { backgroundColor: color }];
  };

  const getSelectedBorder = (color: string): ViewStyle => {
    return { padding: 3, borderColor: color, borderWidth: 1, borderRadius: 50 };
  };

  const openLibrary = async () => {
    setIsImageLoading(true);
    await launchImageLibrary({ mediaType: 'photo' }, res => {
      if (res.assets) {
        if (res.assets[0].uri) {
          setImage(res.assets[0].uri);
        }
      }
    });
    setIsImageLoading(false);
  };

  const onEndApply = () => {
    setShowToaster(true);
    setTimeout(() => {
      setShowToaster(false);
      goBack();
    }, 2000);
  };

  const redirectToMirror = async () => {
    if (!yourMerchant?.mirror_url) {
      Alert.alert('Mirror URL is empty');
      return;
    }
    try {
      await Linking.openURL(yourMerchant?.mirror_url);
    } catch (err) {
      Alert.alert('Broken URL');
    }
  };

  // render func
  const renderItem = ({ item, index }: ListRenderItemInfo<string>) => {
    const isFirst = index === 0;

    return isFirst ? (
      <View style={getSelectedBorder(item)}>
        <View style={getBallStyles(item)} />
      </View>
    ) : (
      <TouchableOpacity
        onPress={() => setSelectedColour(item)}
        style={getBallStyles(item)}
      />
    );
  };

  const renderFooter = () => {
    return (
      <TouchableOpacity
        style={stylesWithProps.fotterMargin}
        onPress={visibleToggle}>
        <PlusIcon />
      </TouchableOpacity>
    );
  };

  return (
    <View style={stylesWithProps.container}>
      {isLoading && <CustomLoader />}
      <Toaster
        visible={showToaster}
        text="Information has been updated"
        type="top"
      />
      <MainModal isVisible={isVisible} type="bottom" onPressOut={() => null}>
        <ColorModal
          selectedColor={selectedColour}
          setSelected={setSelectedColour}
          startColor={yourMerchant?.theme_settings.mirror_colour}
          modalToggle={visibleToggle}
        />
      </MainModal>
      <View style={stylesWithProps.scrollViewWrapper}>
        <KeyboardAwareScrollView nestedScrollEnabled>
          <Text style={stylesWithProps.title}>Editing a Mirror</Text>
          <Text style={stylesWithProps.subTitle}>
            {
              'Your mirror is your website to show what you sell & generate more business.'
            }
          </Text>
          <CustomTextField
            title="Your description (120 symbols max)"
            value={values.description}
            errorText={errors.description}
            touched={touched.description}
            onBlur={handleBlur('description')}
            onChangeText={handleChange('description')}
            multiline
          />
          <View style={stylesWithProps.row}>
            <View style={stylesWithProps.rowItem}>
              <CustomTextField
                title="Unique link"
                value={values.mirror}
                touched={touched.mirror}
                errorText={errors.mirror}
                onBlur={handleBlur('mirror')}
                onChangeText={handleChange('mirror')}
              />
            </View>
            <Text style={[stylesWithProps.khoyn, stylesWithProps.rowItem]}>
              {domain}
            </Text>
          </View>
          <View style={stylesWithProps.marginWrapper}>
            <Text style={stylesWithProps.addPhotoTitle}>Colour theme: </Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={colors}
              renderItem={renderItem}
              horizontal
              ListFooterComponent={renderFooter}
              contentContainerStyle={stylesWithProps.contentContainer}
              ItemSeparatorComponent={() => (
                <View style={stylesWithProps.separator} />
              )}
            />
          </View>
          <CustomTextField
            title="Facebook URL"
            value={values.facebook}
            touched={touched.facebook}
            errorText={errors.facebook}
            onBlur={handleBlur('facebook')}
            onChangeText={handleChange('facebook')}
            accessoryLeft={() => <Facebook />}
          />
          <CustomTextField
            title="Instagram URL"
            value={values.instagram}
            touched={touched.instagram}
            errorText={errors.instagram}
            onBlur={handleBlur('instagram')}
            onChangeText={handleChange('instagram')}
            accessoryLeft={() => <Instagram />}
          />
          <View style={stylesWithProps.marginWrapper}>
            <Text style={stylesWithProps.addPhotoTitle}>
              Profile picture (click to add or replace)
            </Text>
            <LoadImage
              showLoader={isImageLoading}
              onPress={openLibrary}
              imageUri={image}
            />
          </View>
          <BigButton
            title="Show My Mini-Store"
            onPress={redirectToMirror}
            type="secundary"
          />
        </KeyboardAwareScrollView>
      </View>
      <View style={stylesWithProps.bottomContainer}>
        <LittleRedButton title="< Cancel" onPress={goBack} />
        <LittleBlackButton title="Apply >" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default EditMirrorScreen;
