import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { socialLink, updateUrls } from '../../store/reducer';
import CustomTextField from '../../../../components/inputs/CustomTextField/CustomTextField';
import Facebook from '../../../../assets/svgs/socWebIcons/Facebook.svg';
import Instagram from '../../../../assets/svgs/socWebIcons/Instagram.svg';
import Youtube from '../../../../assets/svgs/socWebIcons/Youtube.svg';
import Snapchat from '../../../../assets/svgs/socWebIcons/Snapchat.svg';
import Twitch from '../../../../assets/svgs/socWebIcons/Twitch.svg';
import Whatsapp from '../../../../assets/svgs/socWebIcons/Whatsapp.svg';
import Tiktok from '../../../../assets/svgs/socWebIcons/Tiktok.svg';
import styles from './LinkSocials.style';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { urlValidation } from '../../../../utils/validation/validation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useScale from '../../../../hooks/useScale';

const validationSchema = yup.object().shape({
  tikTok: urlValidation,
  instagram: urlValidation,
  myBlog: urlValidation,
  youTube: urlValidation,
  snapChat: urlValidation,
  twitch: urlValidation,
  facebook: urlValidation,
  whatsApp: urlValidation,
});

type InitialUrls = { [key: string]: string };

const LinkSocials: FC = () => {
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  const dispatch = useAppDispatch();

  const urls = useAppSelector(state => state.profileInfo.socialLinks);
  const initialUrls: InitialUrls = useMemo(() => {
    return urls.reduce(
      (prev, current) => ({ ...prev, [current.id]: current.url }),
      {},
    );
  }, [urls]);

  const { values, errors, touched, handleChange, handleBlur } = useFormik({
    initialValues: initialUrls,
    validationSchema,
    onSubmit: data => console.log(data),
  });

  const getIcon = useCallback((id: string) => {
    switch (id) {
      case 'tikTok':
        return () => <Tiktok />;
      case 'instagram':
        return () => <Instagram />;
      case 'youTube':
        return () => <Youtube />;
      case 'snapChat':
        return () => <Snapchat />;
      case 'twitch':
        return () => <Twitch />;
      case 'facebook':
        return () => <Facebook />;
      case 'whatsApp':
        return () => <Whatsapp />;
      default:
        return undefined;
    }
  }, []);

  const dispatchUrls = useCallback(
    (text: string, id: string) => {
      dispatch(updateUrls({ text, id }));
    },
    [dispatch],
  );

  useEffect(() => {
    urls.forEach(url => {
      dispatchUrls(values[url.id], url.id);
    });
  }, [dispatchUrls, urls, values]);

  const renderItem = (item: socialLink) => {
    return (
      <CustomTextField
        key={item.id}
        accessoryLeft={getIcon(item.id)}
        title={item.title + ' URL'}
        value={values[item.id]}
        touched={touched[item.id]}
        errorText={errors[item.id]}
        onChangeText={handleChange(item.id)}
        onBlur={handleBlur(item.id)}
      />
    );
  };

  return (
    <KeyboardAwareScrollView enableOnAndroid style={stylesWithProps.container}>
      <Text style={stylesWithProps.title}>Link Socials</Text>
      {urls.length ? (
        urls.map(item => renderItem(item))
      ) : (
        <Text style={stylesWithProps.title}>No one Socials Link!</Text>
      )}
    </KeyboardAwareScrollView>
  );
};

export default LinkSocials;
