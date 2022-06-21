import React, { FC } from 'react';
import { View } from 'react-native';
import CustomCheckbox from '../../../../components/CustomCheckbox/CustomCheckbox';
import styles from './ListHeader.style';

type Props = {
  isComplited: boolean;
  setPending: () => void;
  setComplited: () => void;
};

const ListHeader: FC<Props> = ({ isComplited, setPending, setComplited }) => {
  return (
    <View style={styles.container}>
      <View style={styles.marginForFirst}>
        <CustomCheckbox
          onPress={setPending}
          title="Pending"
          isSelected={!isComplited}
        />
      </View>
      <CustomCheckbox
        onPress={setComplited}
        title="Complited"
        isSelected={isComplited}
      />
    </View>
  );
};

export default ListHeader;
