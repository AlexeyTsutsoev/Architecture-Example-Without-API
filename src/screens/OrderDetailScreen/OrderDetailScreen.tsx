import React, { FC, useMemo, useState } from 'react';
import { Text, ScrollView, View, Linking } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { OrdresParamList } from '../../navigation/OrdersNavigation/OrdersNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { LineItem } from '../../API/responsesTypes';
import { useAppDispatch } from '../../redux/store';
import { deleteOrder } from '../../redux/orders/thunk';
import useScale from '../../hooks/useScale';
import { formatFromString } from '../../utils/dateFormat';

import Header from './components/Header';
import ProductItem from './components/ProductItem/ProductItem';
import BigButton from '../../components/buttons/BigButton/BigButton';
import LittleBlackButton from '../../components/buttons/LittleBlackButton/LittleBlackButton';
import LittleRedButton from '../../components/buttons/LittleRedButton/LittleRedButton';
import CustomLoader from '../../components/CustomLoader/CustomLoader';

import MasterCardIcon from '../../assets/svgs/CardIcons/MasterCardIcon.svg';
import Visa from '../../assets/svgs/CardIcons/Visa.svg';

import styles from './OrderDetailScreen.style';

type CustomRouteProps = RouteProp<OrdresParamList, 'OrderDetailScreen'>;
type NavigationProps = StackNavigationProp<
  OrdresParamList,
  'OrderDetailScreen'
>;

const OrderDetailScreen: FC = () => {
  // navigation
  const { item } = useRoute<CustomRouteProps>().params;
  const navigation = useNavigation<NavigationProps>();

  const navigateToProduct = (line: LineItem) => {
    navigation.navigate('ProductInOrderScreen', {
      item: line,
      isComplete: isComplited,
    });
  };

  // redux
  const dispatch = useAppDispatch();

  // styles
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  // state
  const [isLoading, setLoading] = useState<boolean>(false);

  // memoize
  const mainImage = useMemo(
    () => item.lineItems[0]?.variant?.image?.product_url,
    [item.lineItems],
  );
  const isComplited = useMemo(() => item.state !== 'cart', [item.state]);
  const succesPayment = useMemo(() => {
    return item.payments.find(payment => payment.state === 'completed');
  }, [item]);

  // helpers
  const getIcon = () => {
    const card = succesPayment?.payment_method?.card?.brand;
    switch (card) {
      case 'master':
        return <MasterCardIcon style={stylesWithProps.cardIconStyle} />;
      case 'visa':
        return <Visa style={stylesWithProps.cardIconStyle} />;
      default:
        return;
    }
  };

  const getCardTitle = () => {
    const card = succesPayment?.payment_method?.card?.brand;

    switch (card) {
      case 'master':
        return 'MasterCard ';
      case 'visa':
        return 'VISA';
      default:
        return 'No payment';
    }
  };

  const onTrack = () => {
    Linking.openURL(item.orderUrl);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await dispatch(deleteOrder(item.id));
      navigation.goBack();
    } catch (err: any) {
      console.log('ERR_FROM_ORDER_', err);
    } finally {
      setLoading(false);
    }
  };

  const navigateToProceed = () => {
    navigation.navigate('ProceedScreen');
  };

  return (
    <View style={stylesWithProps.main}>
      {isLoading && <CustomLoader />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={stylesWithProps.scrollContainer}>
        <View style={stylesWithProps.scrollWrapper}>
          <Header
            cover={mainImage ?? '../../assets/pngs/header_placeholder.png'}
            number={item.number}
            count={item.lineItems.length}
          />

          <View style={stylesWithProps.container}>
            <Text style={stylesWithProps.itemTitle}>Order Details</Text>
            {item.lineItems.map(lineItem => (
              <ProductItem
                key={lineItem.id}
                name={lineItem.variant?.name}
                cover={lineItem.variant?.image?.product_url}
                count={lineItem.quantity}
                price={lineItem.price}
                totalPrice={lineItem.total}
                isComplete={isComplited}
                onPress={() => navigateToProduct(lineItem)}
              />
            ))}

            {isComplited && (
              <>
                <Text style={stylesWithProps.itemTitle}>Order Date</Text>
                <Text style={stylesWithProps.info}>
                  {formatFromString(item.createdAt)}
                </Text>

                <Text style={stylesWithProps.itemTitle}>
                  Estimated delivery date
                </Text>
                <Text style={stylesWithProps.info}>
                  {formatFromString(item.completedAt!)}
                </Text>

                <Text style={stylesWithProps.itemTitle}>Payment by Card</Text>
                <View style={stylesWithProps.cardInfoContainer}>
                  {getIcon()}
                  <Text style={stylesWithProps.info}>
                    {getCardTitle()}
                    <Text style={stylesWithProps.cardInfo}>
                      ****
                      {item.payments[0]?.payment_method?.card?.last4 ??
                        'No Payment'}
                    </Text>
                  </Text>
                </View>

                <Text style={stylesWithProps.itemTitle}>
                  Shipping to the Head Office
                </Text>
                <Text style={stylesWithProps.info}>
                  {item.shipAddress?.full_address}
                </Text>
              </>
            )}
          </View>

          {isComplited && (
            <View
              style={[
                stylesWithProps.summaryContainer,
                stylesWithProps.container,
              ]}>
              <View style={stylesWithProps.summaryRow}>
                <Text style={stylesWithProps.summaryTitle}>
                  Product price (without shipping)
                </Text>
                <Text style={stylesWithProps.cardInfo}>
                  {item.displayItemTotal}
                </Text>
              </View>
              <View style={stylesWithProps.summaryRow}>
                <Text style={stylesWithProps.summaryTitle}>Shipping</Text>
                <Text style={stylesWithProps.cardInfo}>
                  {item.displayShipTotal}
                </Text>
              </View>
              <View style={stylesWithProps.summaryRow}>
                <Text style={stylesWithProps.summaryTitle}>Total</Text>
                <Text style={stylesWithProps.total}>{item.displayTotal}</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={[stylesWithProps.btnContainer, stylesWithProps.container]}>
        {isComplited ? (
          <>
            <View style={stylesWithProps.btn}>
              <BigButton
                type="secundary"
                title="Get receipt"
                onPress={() => null}
              />
            </View>
            <LittleBlackButton title="Track >" onPress={onTrack} />
          </>
        ) : (
          <>
            <LittleRedButton title="X Delete an order" onPress={onDelete} />
            <LittleBlackButton title="Proceed >" onPress={navigateToProceed} />
          </>
        )}
      </View>
    </View>
  );
};

export default OrderDetailScreen;
