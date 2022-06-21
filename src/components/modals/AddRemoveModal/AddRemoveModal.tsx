import React, { FC, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import AddedToReseller from '../../../assets/svgs/productsIcons/AddedToReseller.svg';
import DelitedFromReseller from '../../../assets/svgs/productsIcons/DelitedFromReseller.svg';
import PressableText from '../../buttons/PressableText/PressableText';
import CustomLoader from '../../CustomLoader/CustomLoader';
import styles from './AddRemoveModal.style';

type Props = {
  isAdd: boolean;
  productName: string;
  onHide: () => Promise<void>;
};
const addedText = 'is in your store now!';
const deletedText = 'was deleted from your store.';

const AddRemoveModal: FC<Props> = ({ isAdd, productName, onHide }) => {
  // state
  const [loading, setLoading] = useState<boolean>(false);

  // memo
  const title = useMemo(
    () => `${productName} ${isAdd ? addedText : deletedText}`,
    [isAdd, productName],
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {loading && (
          <View style={styles.loaderWrapper}>
            <CustomLoader />
          </View>
        )}
        {isAdd ? <AddedToReseller /> : <DelitedFromReseller />}
        <Text style={styles.title}>{title}</Text>
        {isAdd ? (
          <Text style={styles.subTitle}>You can add something else.</Text>
        ) : (
          <PressableText onPress={onHide} title="return" />
        )}
      </View>
    </View>
  );
};

export default AddRemoveModal;
