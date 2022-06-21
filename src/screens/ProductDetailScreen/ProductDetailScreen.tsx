import React, { FC, useMemo, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootHomeParamList } from '../../navigation/HomeNavigation/HomeNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootAppParamList } from '../../navigation/AppNavigator/AppNavigator';
import { useAppDispatch } from '../../redux/store';

import useScale from '../../hooks/useScale';
import { addToMyStore, deleteFromMyStore } from '../../redux/products/thunks';

import CustomHeader from './CustomHeader/CustomHeader';
import ShareModal from '../../components/modals/ShareModal/ShareModal';
import MainModal from '../../components/modals/MainModal/MainModal';
import BigButton from '../../components/buttons/BigButton/BigButton';
import MenuItem from '../../components/buttons/MenuItem/MenuItem';
import OrderModal from '../../components/modals/OrderModal/OrderModal';
import SuccessAddedModal from '../../components/modals/SuccessAddedModal/SuccessAddedModal';
import AddRemoveModal from '../../components/modals/AddRemoveModal/AddRemoveModal';

import VElipses from '../../assets/svgs/general/VElipses.svg';
import PriceIcon from '../../assets/svgs/productsIcons/PriceIcon.svg';
import ShippingIcon from '../../assets/svgs/productsIcons/ShippingIcon.svg';
import StockIcon from '../../assets/svgs/productsIcons/StockIcon.svg';
import ShareIcon from '../../assets/svgs/general/ShareIcon.svg';
import EditIcon from '../../assets/svgs/general/EditIcon.svg';

import styles from './ProductDetailScreen.style';
import { editPrice } from '../../redux/resellerProducts/thunk';
import EditPriceModal from '../../components/modals/EditPriceModal/EditPriceModal';

const placeholderName = "Nike F.C. Women's Tie-Dye Football Shirt";

type RouteConfig = RouteProp<RootHomeParamList, 'ProductDetailScreen'>;
type NavigationProps = StackNavigationProp<RootAppParamList, 'HomeNavigator'>;

const ProductDetailScreen: FC = () => {
  //navigation
  const { params } = useRoute<RouteConfig>();
  const navigation = useNavigation<NavigationProps>();

  // redux
  const dispatch = useAppDispatch();

  //memoize
  const item = useMemo(() => params.item, [params.item]);

  //state
  const [isShowShare, setIsShowShare] = useState<boolean>(false);
  const [isSHowOrder, setIsShowOrder] = useState<boolean>(false);
  const [isShowEditPrice, setIsShowEditPrice] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isShowAdded, setIsShowAdded] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isAddedToReseller, setIsAddedToResellerCatalog] = useState<boolean>(
    item.isAddedToResellerCatalog,
  );
  const [message, setMessage] = useState<string>('');

  // styles
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  // menu handlers
  const shareToggle = () => {
    setIsShowShare(prev => !prev);
  };

  const orderToggle = () => {
    setIsShowOrder(prev => !prev);
  };

  const hideOrderWithMessage = (msg?: string) => {
    setIsShowOrder(false);
    if (msg) {
      setMessage(msg);
    }
  };

  const hideMessage = () => {
    setMessage('');
  };

  const navigateToCart = () => {
    navigation.navigate('OrdersNavigation');
    hideMessage();
  };

  const onRemove = async () => {
    try {
      await dispatch(deleteFromMyStore(item.resellerCatalogId)).unwrap();
      showAddedModal(false);
      setIsAddedToResellerCatalog(false);
    } catch (err: any) {
      Alert.alert(err.message);
    }
  };

  const onAdd = async () => {
    try {
      await dispatch(addToMyStore(item.id)).unwrap();
      showAddedModal(true);
      setIsAddedToResellerCatalog(true);
    } catch (err: any) {
      Alert.alert(err.message);
    }
  };

  const onAddRemoveHendler = async () => {
    try {
      setLoading(true);
      if (isAddedToReseller) {
        await onRemove();
        return;
      }
      await onAdd();
    } catch (err: any) {
      console.log('ERR_ADD_PRODUCT_TO_STORE_IN_ITEM', err);
    } finally {
      setLoading(false);
    }
  };

  const showAddedModal = (result: boolean) => {
    setIsShowAdded(true);
    setIsAdded(result);
  };

  const hideAddedModal = async () => {
    try {
      setIsShowAdded(false);
      setLoading(true);
      await dispatch(addToMyStore(item.id));
    } catch (err: any) {
      console.log('ERROR_FROM_MODAL_', err);
      Alert.alert(err.message ?? 'Error from server');
    } finally {
      setLoading(false);
    }
  };

  const editToggle = () => {
    setIsShowEditPrice(prev => !prev);
  };

  const updatePrice = async (value: number) => {
    try {
      await dispatch(editPrice({ id: item.resellerCatalogId, markup: value }));
    } catch (err: any) {
      Alert.alert(err.message ?? 'Eror with server');
    }
  };

  return (
    <View style={stylesWithProps.container}>
      <MainModal isVisible={isShowEditPrice} onPressOut={editToggle}>
        <EditPriceModal
          price={item.numericPrice}
          initialValue={item.percentageMarkup}
          onCancel={editToggle}
          handleSubmit={updatePrice}
        />
      </MainModal>
      <MainModal
        type="center"
        isVisible={isShowAdded}
        onPressOut={hideAddedModal}>
        <AddRemoveModal
          isAdd={isAdded}
          onHide={hideAddedModal}
          productName={item.name}
        />
      </MainModal>
      <MainModal isVisible={isShowShare} onPressOut={shareToggle} type="bottom">
        <ShareModal
          description={item.description}
          shareLink={item.productUrl}
          image={item.imageUrl}
        />
      </MainModal>
      <MainModal isVisible={!!message} onPressOut={hideMessage} type="center">
        <SuccessAddedModal title={message} onPress={navigateToCart} />
      </MainModal>
      <MainModal isVisible={isSHowOrder} onPressOut={orderToggle} type="bottom">
        <OrderModal resellerItem={item} onHide={hideOrderWithMessage} />
      </MainModal>
      <View style={stylesWithProps.scrollView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CustomHeader
            covers={item.covers}
            name={item?.name ?? placeholderName}
            isAddedToReseller={isAddedToReseller}
            onAddPress={onAddRemoveHendler}
            isLoading={isLoading}
          />
          <View style={stylesWithProps.mainContent}>
            <View style={stylesWithProps.mainInfo}>
              <View style={stylesWithProps.topContainer}>
                <Text
                  style={
                    stylesWithProps.marginText
                  }>{`Your margin ${item.displayMargin}`}</Text>
                <Menu>
                  <MenuTrigger>
                    <View style={stylesWithProps.iconWrapper}>
                      <VElipses />
                    </View>
                  </MenuTrigger>
                  <MenuOptions>
                    {isAddedToReseller && (
                      <MenuOption onSelect={editToggle}>
                        <MenuItem
                          title="Edit Price"
                          icon={() => <EditIcon />}
                        />
                      </MenuOption>
                    )}
                    <MenuOption onSelect={shareToggle}>
                      <MenuItem title="Share" icon={() => <ShareIcon />} />
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>
              <View style={stylesWithProps.infoContainer}>
                <View style={stylesWithProps.infoTopContainer}>
                  <View style={stylesWithProps.infoTopItem}>
                    <PriceIcon style={stylesWithProps.iconMargin} />
                    <Text style={stylesWithProps.infoItemText}>
                      {item.price}
                    </Text>
                  </View>
                  <View style={stylesWithProps.infoTopItem}>
                    <StockIcon style={stylesWithProps.iconMargin} />
                    <Text style={stylesWithProps.infoItemText}>In stock</Text>
                  </View>
                </View>
                <View style={stylesWithProps.infoBottomItem}>
                  <ShippingIcon style={stylesWithProps.iconMargin} />
                  <Text style={stylesWithProps.infoItemText}>
                    {item.shipping}
                  </Text>
                </View>
              </View>
              <Text style={stylesWithProps.descriptionText}>
                {item?.description}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={stylesWithProps.bottomContainer}>
        <BigButton title="Add to an order >" onPress={orderToggle} />
      </View>
    </View>
  );
};

export default ProductDetailScreen;
