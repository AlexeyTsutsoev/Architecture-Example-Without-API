import React, { FC, useEffect, useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import CustomRadioGroup, {
  RadioItemType,
} from '../../components/inputs/CustomRadioGroup/CustomRadioGroup';
import { loadAddresses } from '../../redux/addresses/thunk';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import SplashScreen from '../SplashScreen/SplashScreen';
import PlusIcon from '../../assets/svgs/general/PlusIcon.svg';
import PressableTextWithAcc from '../../components/buttons/PlusText/PressableTextWithAcc';
import BigButton from '../../components/buttons/BigButton/BigButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { OrdresParamList } from '../../navigation/OrdersNavigation/OrdersNavigation';
import styles from './ProceedScreen.style';

type NavigationProps = StackNavigationProp<OrdresParamList, 'ProceedScreen'>;

const ProceedScreen: FC = () => {
  // navigation
  const navigation = useNavigation<NavigationProps>();

  const navigateToAddressForm = () => {
    navigation
      .getParent()
      ?.navigate('SettingNavigation', { screen: 'AddressInfoFormScreen' });
  };

  // redux
  const dispatch = useAppDispatch();
  const { addresses, isLoading } = useAppSelector(state => state.addresses);

  // state
  const [selectedAddress, setSelectedAddress] = useState<string>('');

  // memoize
  const addressForRender = useMemo(() => {
    return addresses?.map((address): RadioItemType => {
      return {
        id: address.id!,
        title: address.fullName!,
        subTitle: address.fullAddress,
      };
    });
  }, [addresses]);

  // effects
  useEffect(() => {
    (async () => {
      try {
        if (addresses) {
          return;
        }
        await dispatch(loadAddresses());
      } catch (err) {
        console.log('USE_EFFECT_ADDRESSES_ERR', err);
      }
    })();
  }, [dispatch, addresses]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select an address or create new one</Text>
      <CustomRadioGroup
        items={addressForRender!}
        setSelectedItem={setSelectedAddress}
        selectedItem={selectedAddress}
      />
      <PressableTextWithAcc
        title="Add Address"
        onPress={navigateToAddressForm}
        Icon={() => <PlusIcon />}
      />
      <View style={styles.bottomContainer}>
        <BigButton title="Proceed >" onPress={() => null} />
      </View>
    </View>
  );
};

export default ProceedScreen;
