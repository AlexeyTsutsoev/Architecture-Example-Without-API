import React, { FC, useCallback, useMemo, useState } from 'react';
import { Linking, ListRenderItemInfo, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import BigButton, {
  ButtonProps,
} from '../../components/buttons/BigButton/BigButton';
import styles from './SettingScreen.style';
import MainModal from '../../components/modals/MainModal/MainModal';
import CustomRadioGroup from '../../components/inputs/CustomRadioGroup/CustomRadioGroup';
import { resetState, setCurrentMerchat } from '../../redux/main/mainReducer';
import { reloadProducts } from '../../redux/products/reducer';
import { SettingParamList } from '../../navigation/SettingNavigation/SettingNavigation';
import { StackNavigationProp } from '@react-navigation/stack';

//icons
import BankAccountIcon from '../../assets/svgs/settingsIcons/BankAccountIcon.svg';
import ChangePassIcon from '../../assets/svgs/settingsIcons/ChangePassIcon.svg';
import HelpIcon from '../../assets/svgs/settingsIcons/HelpIcon.svg';
import KhoynTsCsIcon from '../../assets/svgs/settingsIcons/KhoynTsCsIcon.svg';
import MyAddressIcon from '../../assets/svgs/settingsIcons/MyAddressIcon.svg';
import ProfileSettingIcon from '../../assets/svgs/settingsIcons/ProfileSettingIcon.svg';
import StoreSettingIcon from '../../assets/svgs/settingsIcons/StoreSettingIcon.svg';

import { FlatList } from 'react-native-gesture-handler';
import SettingItem from './components/SettingItem/SettingItem';
import { useNavigation } from '@react-navigation/native';
import ListFooter from './components/ListFooter/ListFooter';
import LogoutModal from './components/LogoutModal/LogoutModal';
import { loadProducts } from '../../redux/products/thunks';
import { loadOrders } from '../../redux/orders/thunk';
import { loadResellerProducts } from '../../redux/resellerProducts/thunk';
import AuthStorageService from '../../utils/AsyncStorageService/AuthStorageService';
import MerchantStorageService from '../../utils/AsyncStorageService/MerchantStorageService';

type NavigationProps = StackNavigationProp<SettingParamList, 'SettingScreen'>;

type RouteType = {
  Icon: () => JSX.Element;
  title: string;
  route: keyof SettingParamList | 'KhoynTsCsScreen';
};

const routes: RouteType[] = [
  {
    Icon: () => <ProfileSettingIcon />,
    title: 'Profile Settings',
    route: 'ProfileSettingScreen',
  },
  {
    Icon: () => <ChangePassIcon />,
    title: 'Changing password',
    route: 'ChangePassScreen',
  },
  {
    Icon: () => <StoreSettingIcon />,
    title: 'Store Settings',
    route: 'StoreSettingScreen',
  },
  {
    Icon: () => <MyAddressIcon />,
    title: 'My Addresses',
    route: 'MyAddressScreen',
  },
  {
    Icon: () => <BankAccountIcon />,
    title: 'Bank Account',
    route: 'BankAccountScreen',
  },
  {
    Icon: () => <HelpIcon />,
    title: 'Help',
    route: 'HelpScreen',
  },
  {
    Icon: () => <KhoynTsCsIcon />,
    title: 'Khoyn Ts & Cs',
    route: 'KhoynTsCsScreen',
  },
];

const SettingScreen: FC = () => {
  //navigation
  const navigation = useNavigation<NavigationProps>();
  // redux
  const dispatch = useAppDispatch();
  const currentMerch = useAppSelector(
    state => state.main.user?.currentMerchant,
  );
  const merchants = useAppSelector(state =>
    state.main.user?.merchats?.map(item => ({
      id: item.merchant_id,
      title: item.merchant_name,
      url: item.mirror_url,
    })),
  );

  //screen state
  const [isVisible, setVisible] = useState<boolean>(false);
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>(currentMerch ?? '');

  // memoize
  const currentMirror = useMemo(
    () => merchants?.find(merchant => merchant.id === currentMerch)?.url,
    [currentMerch, merchants],
  );

  const currentMerchName = useMemo(
    () => merchants?.find(merchant => merchant.id === currentMerch)?.title,
    [currentMerch, merchants],
  );

  const onSelectItem = useCallback(
    (text: string) => {
      setSelectedItem(text);
    },
    [setSelectedItem],
  );

  const goOut = useCallback(async () => {
    dispatch(resetState());
    await AuthStorageService.removeAuth();
    await MerchantStorageService.removeMerchant();
  }, [dispatch]);

  const openMirror = useCallback(() => {
    Linking.openURL(currentMirror!);
  }, [currentMirror]);

  const navigateToEditMirror = useCallback(() => {
    navigation.navigate('EditMirrorScreen');
  }, [navigation]);

  const buttons = useMemo(
    (): ButtonProps[] => [
      {
        title: currentMerchName
          ? `Switch ${currentMerchName}`
          : 'No Selected Merchant',
        type: 'secundary',
        onPress: () => modalToggle(),
      },
      {
        title: 'Edit Mirror',
        type: 'secundary',
        onPress: () => navigateToEditMirror(),
      },
      {
        title: currentMirror ?? 'No Selected Mirror',
        type: 'secundary',
        onPress: () => openMirror(),
      },
      {
        title: 'Log Out',
        type: 'red',
        onPress: () => logoutToggle(),
      },
    ],
    [currentMerchName, currentMirror, navigateToEditMirror, openMirror],
  );

  const dispatchNewCurrentMerchant = () => {
    if (selectedItem) {
      dispatch(setCurrentMerchat(selectedItem));
      dispatch(reloadProducts());
      dispatch(loadProducts());
      dispatch(loadOrders());
      dispatch(loadResellerProducts());
      modalToggle();
    }
  };

  const navigateToSetting = (route: keyof SettingParamList) => {
    navigation.navigate(route);
  };

  const openLink = () => {
    Linking.openURL('https://www.khoyn.com/terms-and-conditions');
  };

  const modalToggle = () => {
    setVisible(prev => !prev);
  };

  const logoutToggle = () => {
    setIsLogout(prev => !prev);
  };

  const renderItem = ({ item }: ListRenderItemInfo<RouteType>) => {
    const onPress =
      item.route === 'KhoynTsCsScreen'
        ? openLink
        : () => navigateToSetting(item.route as keyof SettingParamList);
    return (
      <SettingItem title={item.title} Icon={item.Icon} onPress={onPress} />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.listWraper}
        ListFooterComponentStyle={styles.listFooterStyle}
        data={routes}
        renderItem={renderItem}
        ListFooterComponent={<ListFooter items={buttons} />}
      />
      <MainModal type="bottom" isVisible={isLogout} onPressOut={logoutToggle}>
        <LogoutModal onLogOut={goOut} onReturn={logoutToggle} />
      </MainModal>
      <MainModal type="center" isVisible={isVisible} onPressOut={modalToggle}>
        <View style={styles.modalContainer}>
          {merchants && (
            <CustomRadioGroup
              selectedItem={selectedItem}
              title="Your Merchants"
              setSelectedItem={onSelectItem}
              items={merchants}
            />
          )}
          <BigButton
            title="Select new >"
            onPress={dispatchNewCurrentMerchant}
          />
        </View>
      </MainModal>
    </View>
  );
};

export default SettingScreen;
