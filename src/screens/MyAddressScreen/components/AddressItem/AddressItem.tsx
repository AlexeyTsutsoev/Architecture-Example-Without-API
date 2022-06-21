import React, { FC } from 'react';
import { AddressesType } from '../../../../redux/addresses/reducer';
import { View, Text } from 'react-native';
import styles from './AddressItem.style';
import { Swipeable } from 'react-native-gesture-handler';
import Actions from '../Actions/Actions';

type Props = {
  address: AddressesType;
};

const AddressItem: FC<Props> = ({ address }) => {
  return (
    <Swipeable
      renderRightActions={() => (
        <Actions isArchived={address.archived} address={address} />
      )}>
      <View style={styles.container}>
        <Text style={styles.title}>{address.fullName}</Text>
        <Text style={styles.subTitle}>{address.fullAddress}</Text>
      </View>
    </Swipeable>
  );
};

export default AddressItem;
