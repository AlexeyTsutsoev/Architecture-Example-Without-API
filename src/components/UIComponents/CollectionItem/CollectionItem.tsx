import React, { FC, useMemo, useState } from 'react';
import { Alert, ImageBackground, Pressable, Text, View } from 'react-native';

import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/core';
import { RootHomeParamList } from '../../../navigation/HomeNavigation/HomeNavigation';
import { StackNavigationProp } from '@react-navigation/stack';

import useScale from '../../../hooks/useScale';
import { useAppDispatch } from '../../../redux/store';
import {
  addToMyStore,
  deleteFromMyStore,
} from '../../../redux/products/thunks';

import LittleBlackButton from '../../buttons/LittleBlackButton/LittleBlackButton';
import PressableText from '../../buttons/PressableText/PressableText';
import MenuItem from '../../buttons/MenuItem/MenuItem';
import CustomLoader from '../../CustomLoader/CustomLoader';
import MainModal from '../../modals/MainModal/MainModal';
import ShareModal from '../../modals/ShareModal/ShareModal';

import VElipses from '../../../assets/svgs/general/VElipses.svg';
import ShareIcon from '../../../assets/svgs/general/ShareIcon.svg';
import AddItem from '../../../assets/svgs/general/AddItem.svg';
import RemoveItem from '../../../assets/svgs/general/RemoveItem.svg';
import EditIcon from '../../../assets/svgs/general/EditIcon.svg';

import styles from './CollectionItem.style';

import { PreparedProduct } from '../../../utils/prepareProduct';
import OrderModal from '../../modals/OrderModal/OrderModal';
import SuccessAddedModal from '../../modals/SuccessAddedModal/SuccessAddedModal';
import AddRemoveModal from '../../modals/AddRemoveModal/AddRemoveModal';
import EditPriceModal from '../../modals/EditPriceModal/EditPriceModal';
import { editPrice } from '../../../redux/resellerProducts/thunk';

type Props = {
  product: PreparedProduct;
};

type NavigationProps = StackNavigationProp<RootHomeParamList, 'Categories'>;

const CollectionItem: FC<Props> = ({ product }) => {
  // navigation
  const navigation = useNavigation<NavigationProps>();

  // style
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  // redux
  const dispatch = useAppDispatch();

  // state
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showShare, setShowShare] = useState<boolean>(false);
  const [isShowEditPrice, setIsEditPrice] = useState<boolean>(false);
  const [isShowOrder, setIsShowOrder] = useState<boolean>(false);
  const [isShowAdded, setIsShowAdded] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  // memo
  const title = useMemo(() => {
    return product.name.length < 30
      ? product.name
      : product.name.substring(0, 25) + '...';
  }, [product.name]);

  // helpers
  const showIsAdded = () => {
    setIsShowAdded(true);
  };

  const hideIsAdded = async () => {
    try {
      setIsShowAdded(false);
      setLoading(true);
      await dispatch(addToMyStore(product.id));
    } catch (err: any) {
      console.log('ERROR_FROM_MODAL_', err);
      Alert.alert(err.message ?? 'Error from server');
    } finally {
      setLoading(false);
    }
  };

  const onAdd = async () => {
    try {
      await dispatch(addToMyStore(product.id)).unwrap();
      showIsAdded();
    } catch (err: any) {
      Alert.alert(err.mesage ?? 'Error with server');
    }
  };

  const onRemove = async () => {
    try {
      await dispatch(deleteFromMyStore(product.resellerCatalogId));
      showIsAdded();
    } catch (err: any) {
      Alert.alert(err.message ?? 'Eror with server');
    }
  };

  const onIconPress = async () => {
    try {
      setLoading(true);
      if (product.isAddedToResellerCatalog) {
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

  const navigateToProductDetails = () => {
    if (product) {
      navigation.navigate('ProductDetailScreen', { item: product });
    }
  };

  const shareToggle = () => {
    setShowShare(prev => !prev);
  };

  const editToggle = () => {
    setIsEditPrice(prev => !prev);
  };

  const orderModalToggle = () => {
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

  const navigationToCart = () => {
    navigation.getParent()?.navigate('OrdersNavigation');
    hideMessage();
  };

  const sumbiteChangePrice = async (value: number) => {
    try {
      await dispatch(
        editPrice({ id: product.resellerCatalogId, markup: value }),
      );
    } catch (err: any) {
      Alert.alert(err.message ?? 'Eror with server');
    }
  };

  return (
    <View
      style={[stylesWithProps.container, isLoading && stylesWithProps.loading]}>
      <MainModal isVisible={isShowAdded} type="center" onPressOut={hideIsAdded}>
        <AddRemoveModal
          onHide={hideIsAdded}
          productName={product.name}
          isAdd={product.isAddedToResellerCatalog}
        />
      </MainModal>
      <MainModal isVisible={isShowEditPrice} onPressOut={editToggle}>
        <EditPriceModal
          price={product.numericPrice}
          initialValue={product.percentageMarkup}
          onCancel={editToggle}
          handleSubmit={sumbiteChangePrice}
        />
      </MainModal>
      <MainModal isVisible={showShare} onPressOut={shareToggle}>
        <ShareModal
          description={product.description}
          shareLink={product.productUrl}
          image={product.imageUrl}
        />
      </MainModal>
      <MainModal isVisible={isShowOrder} onPressOut={orderModalToggle}>
        <OrderModal resellerItem={product} onHide={hideOrderWithMessage} />
      </MainModal>
      <MainModal isVisible={!!message} onPressOut={hideMessage} type="center">
        <SuccessAddedModal title={message} onPress={navigationToCart} />
      </MainModal>
      <Pressable
        onPress={navigateToProductDetails}
        style={stylesWithProps.imageContainer}>
        <ImageBackground
          style={stylesWithProps.image}
          source={{
            uri: product.imageUrl,
          }}>
          <Pressable
            style={stylesWithProps.plusRemoveContainer}
            onPress={onIconPress}>
            {product.isAddedToResellerCatalog ? <RemoveItem /> : <AddItem />}
          </Pressable>
        </ImageBackground>
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
                <MenuOption onSelect={shareToggle}>
                  <MenuItem title="Share" icon={() => <ShareIcon />} />
                </MenuOption>
                {product.isAddedToResellerCatalog && (
                  <MenuOption onSelect={editToggle}>
                    <MenuItem title="Edit Price" icon={() => <EditIcon />} />
                  </MenuOption>
                )}
              </MenuOptions>
            </Menu>
          </View>
          <Text minimumFontScale={10} style={stylesWithProps.grayText}>
            {product.price}
          </Text>
          <Text style={stylesWithProps.grayText}>{product.shipping}</Text>
          <PressableText
            title="Show details >"
            onPress={navigateToProductDetails}
          />
        </View>
        <LittleBlackButton
          title="Add to an order >"
          onPress={orderModalToggle}
        />
      </View>
      {isLoading && (
        <View style={stylesWithProps.loadingContainer}>
          <CustomLoader />
        </View>
      )}
    </View>
  );
};

export default CollectionItem;
