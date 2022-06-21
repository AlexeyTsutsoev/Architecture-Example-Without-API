import React, { FC, useMemo, useState } from 'react';
import { Linking, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { OrdresParamList } from '../../../../navigation/OrdersNavigation/OrdersNavigation';

import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import MenuItem from '../../../../components/buttons/MenuItem/MenuItem';
import { SvgProps } from 'react-native-svg';

import useScale from '../../../../hooks/useScale';
import { OrdersItemType } from '../../../../redux/orders/reducer';

import BigButton from '../../../../components/buttons/BigButton/BigButton';
import PressableText from '../../../../components/buttons/PressableText/PressableText';
import ImagesCover from '../ImagesCover/ImagesCover';

import VElipses from '../../../../assets/svgs/general/VElipses.svg';
import CloseIcon from '../../../../assets/svgs/general/CloseIcon.svg';
import CanceledIcon from '../../../../assets/svgs/ordersIcons/CanceledIcon.svg';
import CompleteIcon from '../../../../assets/svgs/ordersIcons/CompleteIcon.svg';
import ShippingIcon from '../../../../assets/svgs/ordersIcons/ShippingIcon.svg';

import styles from './ListItem.style';
import CustomLoader from '../../../../components/CustomLoader/CustomLoader';

type Props = {
  item: OrdersItemType;
  onPress: (item: OrdersItemType) => void;
  onDelete: (id: string) => Promise<void>;
};

type OrderInfo = {
  buttonText: string;
  isShowBurger: boolean;
  StatusIcon: FC<SvgProps> | null;
  buttonType: 'secundary' | 'black';
  onBtnPress: () => void;
};

type NavigationProps = StackNavigationProp<OrdresParamList, 'CartScreen'>;

const ListItem: FC<Props> = ({ item, onPress, onDelete }) => {
  // style
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  // navigation
  const navigation = useNavigation<NavigationProps>();

  const navigateToProceed = () => {
    navigation.navigate('ProceedScreen');
  };

  // state
  const [isLoading, setLoading] = useState<boolean>(false);

  // memo
  const { buttonText, buttonType, isShowBurger, StatusIcon, onBtnPress } =
    useMemo<OrderInfo>(() => {
      switch (item.state) {
        case 'complete':
          return {
            buttonText: 'Re-Order >',
            isShowBurger: false,
            StatusIcon: CompleteIcon,
            buttonType: 'secundary',
            onBtnPress: () => null,
          };
        case 'cart':
          return {
            buttonText: 'Proceed >',
            isShowBurger: true,
            StatusIcon: null,
            buttonType: 'black',
            onBtnPress: navigateToProceed,
          };
        case 'address':
          return {
            buttonText: 'Track >',
            isShowBurger: false,
            StatusIcon: ShippingIcon,
            buttonType: 'black',
            onBtnPress: onTrack,
          };
        case 'canceled':
          return {
            buttonText: 'No action',
            isShowBurger: false,
            StatusIcon: CanceledIcon,
            buttonType: 'black',
            onBtnPress: () => null,
          };
        default:
          return {
            buttonText: 'No action',
            isShowBurger: false,
            StatusIcon: CanceledIcon,
            buttonType: 'black',
            onBtnPress: () => null,
          };
      }
    }, [item.state]);

  const deleteHandler = async () => {
    try {
      setLoading(true);
      await onDelete(item.id);
    } catch (err: any) {
      console.log('ERR_WITH_REMOVE_FROM_ITEM', err);
    } finally {
      setLoading(false);
    }
  };

  const onTrack = () => {
    Linking.openURL(item.orderUrl);
  };

  return (
    <View
      style={[
        stylesWithProps.container,
        isLoading && stylesWithProps.withLoading,
      ]}>
      <ImagesCover products={item.lineItems} />
      <View style={stylesWithProps.info}>
        <View>
          <View style={stylesWithProps.titleContainer}>
            <Text style={stylesWithProps.title}>{`№${item.number}`}</Text>
            {StatusIcon && <StatusIcon style={stylesWithProps.titleIcon} />}
          </View>
          <Text
            style={
              stylesWithProps.mainText
            }>{`Total Price ${item.displayItemTotal}`}</Text>
          <Text
            style={
              stylesWithProps.mainText
            }>{`${item.lineItems.length} items`}</Text>
          <Text style={stylesWithProps.mainText}>{item.merchantName}</Text>
          <PressableText onPress={() => onPress(item)} title="Show details >" />
        </View>
        {buttonText !== 'No action' && (
          <BigButton
            onPress={onBtnPress}
            type={buttonType}
            title={buttonText}
          />
        )}
      </View>
      <View style={stylesWithProps.dotContainer}>
        {isShowBurger && (
          <Menu>
            <MenuTrigger>
              <View style={stylesWithProps.elipsesWrapper}>
                <VElipses />
              </View>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={deleteHandler}>
                <MenuItem title="Delete an order" icon={() => <CloseIcon />} />
              </MenuOption>
            </MenuOptions>
          </Menu>
        )}
      </View>
      {isLoading && (
        <View style={stylesWithProps.loaderWrapper}>
          <CustomLoader />
        </View>
      )}
    </View>
  );
};

export default ListItem;
