import React, { FC, useMemo, useState } from 'react';
import { Text, View } from 'react-native';

import useScale from '../../../hooks/useScale';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

import LittleBlackButton from '../../buttons/LittleBlackButton/LittleBlackButton';
import LittleRedButton from '../../buttons/LittleRedButton/LittleRedButton';
import CustomRadioGroup, {
  RadioItemType,
} from '../../inputs/CustomRadioGroup/CustomRadioGroup';

import styles from './OrderModal.style';

import { PreparedProduct } from '../../../utils/prepareProduct';
import CustomLoader from '../../CustomLoader/CustomLoader';
import { addNewOrder, patchNewOrder } from '../../../redux/orders/thunk';

const createNewOrder = 'create';

type Props = {
  resellerItem: PreparedProduct;
  onHide: (addedName?: string) => void;
};

const OrderModal: FC<Props> = ({ resellerItem, onHide }) => {
  // style
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  // redux
  const { orders, isLoading } = useAppSelector(state => state.orders);
  const dispatch = useAppDispatch();

  // state
  const [selectedOrder, setSelectedOrder] = useState<string>(createNewOrder);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [isStep, setStep] = useState<boolean>(false);

  //memo
  const filteredOrders = useMemo(() => {
    if (!orders) {
      return [];
    }
    return orders.filter(order => order.state !== 'complete');
  }, [orders]);

  const ordersForRender: RadioItemType[] = useMemo(() => {
    if (filteredOrders) {
      const preparedOrders = filteredOrders?.map(order => ({
        id: order.id,
        title: `Order ${order.number}`,
      }));
      return [
        ...preparedOrders,
        { id: createNewOrder, title: 'Create New Order' },
      ];
    }
    return [];
  }, [filteredOrders]);

  const optionsForRender: RadioItemType[] = useMemo(() => {
    if (!isStep) {
      return [];
    }
    if (!resellerItem.variants) {
      const { id, name } = resellerItem.masterVariant;
      return [{ id, title: name }];
    }
    return resellerItem.variants.map(variant => ({
      id: variant.id,
      title: variant.options,
    }));
  }, [resellerItem, isStep]);

  //hendlers
  const onProceed = () => {
    setStep(true);
  };

  const onAdd = async () => {
    try {
      if (selectedOrder === createNewOrder) {
        await dispatch(addNewOrder(selectedVariant));
        onHide(resellerItem.name);
      }
      await dispatch(
        patchNewOrder({ variantId: selectedVariant, orderId: selectedOrder }),
      );
      onHide(resellerItem.name);
    } catch (err: any) {
      console.log('ERR_FROM_MODAL_WINDOW', err);
      onHide();
      return;
    }
  };

  const onSubmit = () => {
    if (!isStep) {
      onProceed();
      return;
    }
    onAdd();
  };

  const onCancel = () => {
    if (!isStep) {
      onHide();
    }
    setStep(false);
  };

  return (
    <View style={stylesWithProps.container}>
      {isLoading && <CustomLoader />}
      <Text style={stylesWithProps.title}>Adding product to an order </Text>
      <Text style={stylesWithProps.subTitle}>
        {`Select an order where you want to add ${resellerItem.name}`}
      </Text>
      <View style={stylesWithProps.mainContent}>
        {!isStep ? (
          <CustomRadioGroup
            items={ordersForRender}
            selectedItem={selectedOrder}
            setSelectedItem={setSelectedOrder}
          />
        ) : (
          <CustomRadioGroup
            items={optionsForRender}
            setSelectedItem={setSelectedVariant}
            selectedItem={selectedVariant}
          />
        )}
      </View>
      <View style={[stylesWithProps.bottomContainer, stylesWithProps.row]}>
        <LittleRedButton title="< Cancel" onPress={onCancel} />
        <LittleBlackButton title="Proceed >" onPress={onSubmit} />
      </View>
    </View>
  );
};

export default OrderModal;
