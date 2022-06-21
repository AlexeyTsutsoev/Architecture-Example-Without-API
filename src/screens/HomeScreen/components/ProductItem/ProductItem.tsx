import React, { FC, useMemo, useState } from 'react';
import {
  Pressable,
  Text,
  ImageBackground,
  PressableStateCallbackType,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';

import useScale from '../../../../hooks/useScale';
import {
  deleteFromMyStore,
  addToMyStore,
} from '../../../../redux/products/thunks';
import { useAppDispatch } from '../../../../redux/store';

import AddRemoveModal from '../../../../components/modals/AddRemoveModal/AddRemoveModal';
import MainModal from '../../../../components/modals/MainModal/MainModal';

import AddItem from '../../../../assets/svgs/general/AddItem.svg';
import RemoveItem from '../../../../assets/svgs/general/RemoveItem.svg';

import colors from '../../../../utils/theme/colors/colors';
import styles from './ProductItem.style';

type Props = {
  id: string;
  resellerId: string;
  title: string;
  cover: string | null;
  price: string;
  added: boolean;
  onPress?: () => void;
};

const ProductItem: FC<Props> = ({
  id,
  resellerId,
  title,
  price,
  cover,
  added,
  onPress,
}) => {
  // redux
  const dispatch = useAppDispatch();

  // state
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  // varaibales
  const imageSource = { uri: cover ?? '' };
  const formattedTitle =
    title.length > 20 ? title.substring(0, 12) + '...' : title;
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  // helpers
  const getContainerStyle = ({ pressed }: PressableStateCallbackType) => {
    return pressed ? stylesWithProps.pressedContainer : null;
  };

  const getIconStyle = ({ pressed }: PressableStateCallbackType) => {
    const touch = pressed ? stylesWithProps.pressedContainer : null;
    return [stylesWithProps.generalIconContainer, touch];
  };

  const showModal = () => {
    setIsShowModal(true);
  };

  const hideModal = async () => {
    try {
      setIsShowModal(false);
      setLoading(true);
      await dispatch(addToMyStore(id));
    } catch (err: any) {
      console.log('ERROR_FROM_MODAL_', err);
      Alert.alert(err.message ?? 'Error from server');
    } finally {
      setLoading(false);
    }
  };

  const onAdd = async () => {
    try {
      await dispatch(addToMyStore(id)).unwrap();
      showModal();
    } catch (err: any) {
      Alert.alert(err.message ?? 'Error with Server');
    }
  };

  const onRemove = async () => {
    try {
      await dispatch(deleteFromMyStore(resellerId)).unwrap();
      showModal();
    } catch (err: any) {
      Alert.alert(err.message ?? 'Error with Server');
    }
  };

  const onIconPress = async () => {
    try {
      setLoading(true);
      if (added) {
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

  return (
    <>
      <MainModal isVisible={isShowModal} onPressOut={hideModal} type="center">
        <AddRemoveModal isAdd={added} productName={title} onHide={hideModal} />
      </MainModal>
      <Pressable style={getContainerStyle} onPress={onPress}>
        <ImageBackground
          style={[
            stylesWithProps.imageStyle,
            stylesWithProps.generalContainer,
            isLoading && stylesWithProps.pressedContainer,
          ]}
          source={imageSource}>
          <Pressable onPress={onIconPress} style={getIconStyle}>
            {added ? <RemoveItem /> : <AddItem />}
          </Pressable>
          {isLoading && (
            <View
              style={[
                stylesWithProps.generalContainer,
                stylesWithProps.loaderContainer,
              ]}>
              <ActivityIndicator size="large" color={colors.main} />
            </View>
          )}
        </ImageBackground>
        <Text style={stylesWithProps.titleText}>{formattedTitle}</Text>
        <Text style={stylesWithProps.priceText}>{price} each</Text>
      </Pressable>
    </>
  );
};

export default ProductItem;
