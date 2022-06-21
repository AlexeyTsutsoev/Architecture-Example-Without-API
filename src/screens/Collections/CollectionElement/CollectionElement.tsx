import React, { FC, useMemo, useState } from 'react';
import { Alert, Image, Pressable, Share, Text, View } from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import useScale from '../../../hooks/useScale';

import MenuItem from '../../../components/buttons/MenuItem/MenuItem';
import PressableText from '../../../components/buttons/PressableText/PressableText';

import VElipses from '../../../assets/svgs/general/VElipses.svg';
import ShareIcon from '../../../assets/svgs/general/ShareIcon.svg';
import AddItem from '../../../assets/svgs/general/AddItem.svg';
import RemoveItem from '../../../assets/svgs/general/RemoveItem.svg';

import { CollectionItemType } from '../../../redux/collections/reducer';
import styles from './CollectionElement.style';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootHomeParamList } from '../../../navigation/HomeNavigation/HomeNavigation';
import { useNavigation } from '@react-navigation/core';

type Props = {
  item: CollectionItemType;
};

type NavigationProps = StackNavigationProp<RootHomeParamList, 'Collections'>;

const CollectionElement: FC<Props> = ({ item }) => {
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  const navigation = useNavigation<NavigationProps>();

  const [added, setAdded] = useState<boolean>(false);

  const title =
    item.name.length < 30 ? item.name : item.name.substring(0, 25) + '...';

  const alertAction = (message: string) => {
    Alert.alert(message);
  };

  // temporary
  const addedToggle = () => {
    setAdded(prev => !prev);
  };

  const getImage = () => {
    const uri = item.cover_image?.original_url;
    return uri ? { uri } : require('../../../assets/pngs/EmptyImage.png');
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Look at this collection: ${item.permalink}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          alertAction(`Link was send with status ${result.activityType}`);
        } else {
          alertAction('We shared link');
        }
      } else if (result.action === Share.dismissedAction) {
        alertAction('Something went wrong');
      }
    } catch (err: any) {
      console.log('ERR_FROM_ONSHARE_', err);
      alertAction('Eror with share');
    }
  };

  const navigateToCollectionProducts = () => {
    navigation.navigate('CollectionProducts', { collection: item });
  };

  return (
    <View style={stylesWithProps.container}>
      <Pressable onPress={addedToggle} style={stylesWithProps.imageContainer}>
        <Image style={stylesWithProps.image} source={getImage()} />
        <View style={stylesWithProps.plusRemoveContainer}>
          {added ? <RemoveItem /> : <AddItem />}
        </View>
      </Pressable>
      <View style={stylesWithProps.infoContainer}>
        <View>
          <View style={stylesWithProps.headerTitle}>
            <Text style={stylesWithProps.nameText}>{title}</Text>
            <Menu>
              <MenuTrigger>
                <View style={stylesWithProps.iconWrapper}>
                  <VElipses />
                </View>
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={onShare}>
                  <MenuItem title="Share" icon={() => <ShareIcon />} />
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
          <Text minimumFontScale={10} style={stylesWithProps.grayText}>
            before we unknow price
          </Text>
          <Text style={stylesWithProps.grayText}>
            before we unknow shipping
          </Text>
          <PressableText
            title="Show products >"
            onPress={navigateToCollectionProducts}
          />
        </View>
      </View>
    </View>
  );
};

export default CollectionElement;
