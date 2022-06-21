import React, { FC } from 'react';
import { View } from 'react-native';
import CustomCheckbox from '../../../../components/CustomCheckbox/CustomCheckbox';
import styles from './AddressHeader.style';

type Props = {
  isArchived: boolean;
  setCurrent: () => void;
  setArchived: () => void;
};

const AddressHeader: FC<Props> = ({ isArchived, setCurrent, setArchived }) => {
  return (
    <View style={styles.container}>
      <View style={styles.marginForFirst}>
        <CustomCheckbox
          onPress={setCurrent}
          title="Current"
          isSelected={!isArchived}
        />
      </View>
      <CustomCheckbox
        onPress={setArchived}
        title="Archived"
        isSelected={isArchived}
      />
    </View>
  );
};

export default AddressHeader;
