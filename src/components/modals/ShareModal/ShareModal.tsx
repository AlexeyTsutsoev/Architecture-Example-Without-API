import React, { FC, useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Share, { ShareSingleOptions } from 'react-native-share';

import PressableText from '../../buttons/PressableText/PressableText';
import Clipboard from '@react-native-clipboard/clipboard';

import Toaster from '../Toaster/Toaster';

import Facebook from '../../../assets/svgs/shareIcons/Facebook.svg';
import Instagram from '../../../assets/svgs/shareIcons/Instagram.svg';
import WABusiness from '../../../assets/svgs/shareIcons/WABusiness.svg';
import Whatsapp from '../../../assets/svgs/shareIcons/Whatsapp.svg';

import useScale from '../../../hooks/useScale';
import styles from './ShareModal.style';

type Props = {
  shareLink?: string;
  description?: string;
  image?: string;
};

type RenderIcon = {
  key: string;
  SocialIcon: FC;
};

const shareMsg = 'You can buy this product by clicking this link: ';

const ShareModal: FC<Props> = ({ shareLink, description, image }) => {
  // style
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  // state
  const [isShowToaster, setShowToaster] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  // memoize
  const onShare = useCallback(
    (key: string) => {
      let msg = description + '\n\n' + shareMsg + shareLink;
      let baseShare: ShareSingleOptions = {
        title: description,
        message: msg,
        url: image,
        social: Share.Social.FACEBOOK,
      };
      switch (key) {
        case 'Facebook':
          baseShare.social = Share.Social.FACEBOOK;
          break;
        case 'Whatsapp':
          baseShare.social = Share.Social.WHATSAPP;
          break;
        case 'Instagram':
          baseShare.social = Share.Social.INSTAGRAM;
          break;
        case 'WAB':
          baseShare.social = Share.Social.WHATSAPPBUSINESS;
          break;
      }
      Share.shareSingle(baseShare)
        .then(res => console.log('res', res))
        .catch(err => console.log('err', err));
    },
    [description, shareLink, image],
  );

  const iconsForRender: RenderIcon[] = useMemo(() => {
    return [
      {
        key: 'Facebook',
        SocialIcon: Facebook,
      },
      {
        key: 'Whatsapp',
        SocialIcon: Whatsapp,
      },
      {
        key: 'Instagram',
        SocialIcon: Instagram,
      },
      {
        key: 'WAB',
        SocialIcon: WABusiness,
      },
    ];
  }, []);

  // helpers
  const renderItem = ({ key, SocialIcon }: RenderIcon) => {
    return (
      <TouchableOpacity key={key} onPress={() => onShare(key)}>
        <SocialIcon />
      </TouchableOpacity>
    );
  };

  const copyLink = () => {
    if (!shareLink) {
      showMessage('Link is broken');
      return;
    }
    Clipboard.setString(shareLink);
    showMessage('Link сcopied');
  };

  const showMessage = (msg: string) => {
    setShowToaster(true);
    setMessage(msg);
    setTimeout(removeMessage, 2000);
  };

  const removeMessage = () => {
    setShowToaster(false);
    setMessage('');
  };

  return (
    <View style={stylesWithProps.container}>
      <Toaster visible={isShowToaster} text={message} type="bottom" />
      <View
        style={[stylesWithProps.itemContainer, stylesWithProps.titleContainer]}>
        <Text>Share this product with</Text>
        <PressableText title="Copy Link" onPress={copyLink} />
      </View>
      <View style={stylesWithProps.itemContainer}>
        {iconsForRender.map(renderItem)}
      </View>
    </View>
  );
};

export default ShareModal;
