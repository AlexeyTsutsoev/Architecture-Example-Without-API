import React, { FC } from 'react';
import { View, Text } from 'react-native';
import HouseIcon from '../../../../assets/svgs/general/HouseIcon.svg';
import BigButton from '../../../../components/buttons/BigButton/BigButton';
import styles from './EmptyComponent.style';

type Props = {
  isArchived: boolean;
  onPress: () => void;
};

const EmptyComponent: FC<Props> = ({ isArchived, onPress }) => {
  const addressType = isArchived ? 'archived' : 'saved';
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{`No ${addressType} addresses yet!`}</Text>
        {isArchived && (
          <Text style={styles.subTitle}>
            You can replace no actual addresses here and use them again, if you
            need.
          </Text>
        )}
      </View>
      <HouseIcon style={styles.icon} />
      {!isArchived && <BigButton title="Add new address" onPress={onPress} />}
    </View>
  );
};

export default EmptyComponent;
