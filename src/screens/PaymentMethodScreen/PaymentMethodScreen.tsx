import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { StoreStackParamList } from '../../navigation/StoreNavigation/StoreNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import Collapsible from 'react-native-collapsible';

import useScale from '../../hooks/useScale';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getPaymentSource } from '../../redux/paymentSource/thunk';

import BigButton from '../../components/buttons/BigButton/BigButton';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import PaymentItem from './PaymentItem/PaymentItem';
import PressableTextWithAcc from '../../components/buttons/PlusText/PressableTextWithAcc';
import MainModal from '../../components/modals/MainModal/MainModal';
import AddNewCardModal from '../../components/modals/AddNewCardModal/AddNewCardModal';
import CancelPurchase from '../../components/modals/CancelPurchase/CancelPurchase';
import SMSModal from '../../components/modals/SMSModal/SMSModal';

import CheckedCircle from '../../assets/svgs/general/CheckedCircle.svg';
import UncheckedCircle from '../../assets/svgs/general/UncheckedCircle.svg';
import PlusIcon from '../../assets/svgs/general/PlusIcon.svg';

import styles from './PaymentMethodScreen.style';

import { Payment } from '../../redux/paymentSource/reducer';

type CustomRouteProps = RouteProp<StoreStackParamList, 'PaymentMethodScreen'>;
type NavigationProps = StackNavigationProp<
  StoreStackParamList,
  'PaymentMethodScreen'
>;

type RadioType = {
  id: string;
  title: string;
  subTitle: string;
};

const PaymentMethodScreen: FC = () => {
  // navigation
  const { price, showWindow } = useRoute<CustomRouteProps>().params;
  const navigation = useNavigation<NavigationProps>();

  // redux
  const dispatch = useAppDispatch();
  const { isLoading, payments } = useAppSelector(state => state.paymentSource);

  // style
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  // state
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isVisibleAddNewCard, setIsVisibleAddNewCard] =
    useState<boolean>(false);
  const [showSMSModal, setShowSMSModal] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<Payment | null>(null);

  // memo
  const OptionsForRender: RadioType[] = useMemo(() => {
    return [
      { id: 'card', title: 'Card', subTitle: 'using your card' },
      {
        id: 'bankTransfer',
        title: 'Bank Transfer',
        subTitle: 'Pay via bank transfer into our SA bank account',
      },
      {
        id: 'instantEFT',
        title: 'InstantEFT',
        subTitle: 'Online instant transfer from your bank account',
      },
    ];
  }, []);

  // callbacks
  const loadCards = useCallback(async () => {
    if (payments) {
      return;
    }
    dispatch(getPaymentSource());
  }, [dispatch, payments]);

  // effects
  useEffect(() => {
    loadCards();
  }, [loadCards]);

  // renders
  const renderItem = ({ item }: ListRenderItemInfo<RadioType>) => {
    const isSelected = item.id === selectedOption;
    const withCollapse = item.id === 'card';

    return (
      <>
        <TouchableOpacity
          onPress={() => setSelectedOption(item.id)}
          style={stylesWithProps.radioContent}>
          {isSelected ? (
            <CheckedCircle style={stylesWithProps.iconStyle} />
          ) : (
            <UncheckedCircle style={stylesWithProps.iconStyle} />
          )}
          <View style={stylesWithProps.contentContainer}>
            <Text style={stylesWithProps.radioTitle}>{item.title}</Text>
            <Text style={stylesWithProps.radioSubTitle}>{item.subTitle}</Text>
          </View>
        </TouchableOpacity>
        {withCollapse && (
          <Collapsible
            style={[
              stylesWithProps.contentContainer,
              stylesWithProps.collapseContainer,
            ]}
            collapsed={!isSelected}>
            {isLoading ? (
              <CustomLoader />
            ) : (
              payments?.map(payment => (
                <PaymentItem
                  key={payment.last4}
                  payment={payment}
                  onPress={() => startPayment(payment)}
                />
              ))
            )}
            <View style={stylesWithProps.buttonContainer}>
              <PressableTextWithAcc
                onPress={addNewCardToggle}
                Icon={() => <PlusIcon />}
                title="Add a new card"
              />
            </View>
          </Collapsible>
        )}
      </>
    );
  };

  // helpers
  const addNewCardToggle = () => {
    setIsVisibleAddNewCard(prev => !prev);
  };

  const showWindowToggle = () => {
    navigation.setParams({ showWindow: !showWindow });
  };

  const startPayment = (payment: Payment) => {
    setSelectedCard(payment);
    setShowSMSModal(true);
  };

  const dismissPayment = () => {
    setSelectedCard(null);
    setShowSMSModal(false);
  };

  const goBack = () => {
    showWindowToggle();
    navigation.reset({
      index: 0,
      routes: [{ name: 'ThunderSubScreen' }],
    });
  };

  const navigateToSuccess = () => {
    navigation.navigate('PaymentSuccessScreen');
  };

  return (
    <View style={stylesWithProps.continer}>
      <MainModal
        type="bottom"
        isVisible={showSMSModal}
        onPressOut={dismissPayment}>
        <SMSModal payment={selectedCard!} />
      </MainModal>
      <MainModal
        type="bottom"
        isVisible={isVisibleAddNewCard}
        onPressOut={addNewCardToggle}>
        <AddNewCardModal onPress={addNewCardToggle} />
      </MainModal>
      <MainModal
        type="bottom"
        isVisible={!!showWindow}
        onPressOut={showWindowToggle}>
        <CancelPurchase onCancel={goBack} onProceed={showWindowToggle} />
      </MainModal>
      <Text style={stylesWithProps.title}>{`You are paying ${price}$`}</Text>
      <Text style={stylesWithProps.subTitle}>Select payment method.</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={OptionsForRender}
        renderItem={renderItem}
        style={stylesWithProps.contentContainer}
      />
      <BigButton title={`Pay ${price}$`} onPress={navigateToSuccess} />
    </View>
  );
};

export default PaymentMethodScreen;
