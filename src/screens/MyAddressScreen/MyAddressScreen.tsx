import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingParamList } from '../../navigation/SettingNavigation/SettingNavigation';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { AddressesType } from '../../redux/addresses/reducer';
import { getProvinces, loadAddresses } from '../../redux/addresses/thunk';

import SplashScreen from '../SplashScreen/SplashScreen';
import AddressHeader from './components/AddressHeader/AddressHeader';
import AddressItem from './components/AddressItem/AddressItem';
import EmptyComponent from './components/EmptyComponent/EmptyComponent';
import PressableTextWithAcc from '../../components/buttons/PlusText/PressableTextWithAcc';

import PlusIcon from '../../assets/svgs/general/PlusIcon.svg';
import styles from './MyAddressScreen.style';

type NavigationProps = StackNavigationProp<SettingParamList, 'MyAddressScreen'>;

const MyAddressScreen: FC = () => {
  // navigation
  const navigation = useNavigation<NavigationProps>();

  const navigateToAddressInfo = () => {
    navigation.navigate('AddressInfoFormScreen');
  };

  //redux
  const { isLoading, addresses, provinces } = useAppSelector(
    state => state.addresses,
  );
  const dispatch = useAppDispatch();

  //screen state
  const [isArchived, setIsArchived] = useState<boolean>(false);
  const [isShowRefresh, setShowRefresh] = useState<boolean>(false);

  // memoize
  const addressesForRender = useMemo(
    () => addresses?.filter(address => address.archived === isArchived),
    [addresses, isArchived],
  );

  const memoizedLoadAddresses = useCallback(async () => {
    try {
      setShowRefresh(true);
      await dispatch(loadAddresses());
      await dispatch(getProvinces());
    } catch (err: any) {
      console.log('ERROR_FROM_DISPATCH');
    } finally {
      setShowRefresh(false);
    }
  }, [dispatch]);

  const getAddresses = useCallback(async () => {
    if (addresses && provinces) {
      return;
    }
    try {
      await memoizedLoadAddresses();
    } catch (err) {
      console.log('USE_EFFECT_ADDRESSES_ERR', err);
    }
  }, [addresses, memoizedLoadAddresses, provinces]);

  // effects
  useEffect(() => {
    getAddresses();
  }, [getAddresses]);

  // archived togglers
  const setArchived = () => {
    setIsArchived(true);
  };

  const setCurrent = () => {
    setIsArchived(false);
  };

  // render funcs
  const renderItem = ({ item }: ListRenderItemInfo<AddressesType>) => {
    return <AddressItem address={item} />;
  };

  const renderFooter = () =>
    isArchived || !addressesForRender?.length ? null : (
      <PressableTextWithAcc
        title="Add Address"
        onPress={navigateToAddressInfo}
        Icon={() => <PlusIcon />}
      />
    );

  const renderHeader = () => (
    <AddressHeader
      isArchived={isArchived}
      setArchived={setArchived}
      setCurrent={setCurrent}
    />
  );

  const renderEmptyComponent = () => (
    <EmptyComponent isArchived={isArchived} onPress={navigateToAddressInfo} />
  );

  // renders
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
        refreshing={isShowRefresh}
        onRefresh={memoizedLoadAddresses}
        data={addressesForRender}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};

export default MyAddressScreen;
