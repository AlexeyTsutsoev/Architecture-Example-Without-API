import React, { FC } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAppDispatch } from '../../../../redux/store';
import {
  archiveAdress,
  deleteAddress,
  setDefaultAddress,
  unarchiveAdress,
} from '../../../../redux/addresses/thunk';

import ArchiveIcon from '../../../../assets/svgs/general/ArchiveIcon.svg';
import DefaultIcon from '../../../../assets/svgs/general/DefaultIcon.svg';
import WhiteCloseIcon from '../../../../assets/svgs/general/WhiteCloseIcon.svg';
import EditIcon from '../../../../assets/svgs/general/EditIcon.svg';

import styles from './Actions.style';
import { AddressesType } from '../../../../redux/addresses/reducer';
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingParamList } from '../../../../navigation/SettingNavigation/SettingNavigation';
import { useNavigation } from '@react-navigation/core';

type Props = {
  address: AddressesType;
  isArchived?: boolean;
};

type NavigationProps = StackNavigationProp<SettingParamList, 'MyAddressScreen'>;

const Actions: FC<Props> = ({ address, isArchived }) => {
  // navigation
  const navigation = useNavigation<NavigationProps>();

  //redux
  const dispatch = useAppDispatch();

  // hendlers
  const deleteItem = () => {
    if (address.id) {
      dispatch(deleteAddress({ id: address.id }));
    }
  };

  const setDefaultItem = () => {
    if (address.id) {
      dispatch(setDefaultAddress({ id: address.id }));
    }
  };

  const archiveItem = () => {
    if (address.id) {
      dispatch(archiveAdress({ id: address.id }));
    }
  };

  const unarchiveItem = () => {
    if (address.id) {
      dispatch(unarchiveAdress({ id: address.id }));
    }
  };

  const startEdit = () => {
    navigation.navigate('AddressInfoFormScreen', { address });
  };

  return (
    <View style={styles.container}>
      {isArchived ? (
        <View style={styles.item}>
          <TouchableOpacity
            onPress={unarchiveItem}
            style={styles.touchableZone}>
            <ArchiveIcon />
            <Text style={styles.title}>Unarchive</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.item}>
            <TouchableOpacity onPress={startEdit} style={styles.touchableZone}>
              <EditIcon />
              <Text style={styles.title}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity
              onPress={setDefaultItem}
              style={styles.touchableZone}>
              <DefaultIcon />
              <Text style={styles.title}>Default</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity
              onPress={archiveItem}
              style={styles.touchableZone}>
              <ArchiveIcon />
              <Text style={styles.title}>Archive</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <View style={[styles.item, styles.delete]}>
        <TouchableOpacity onPress={deleteItem} style={styles.touchableZone}>
          <WhiteCloseIcon />
          <Text style={[styles.title, styles.deleteTitle]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Actions;
