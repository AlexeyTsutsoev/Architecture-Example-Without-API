import React, { FC } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import EmptyProductIcon from '../../../../assets/svgs/productsIcons/EmptyProductIcon.svg';
import PressableText from '../../../../components/buttons/PressableText/PressableText';
import { reloadResllerProduct } from '../../../../redux/resellerProducts/reducer';
import { loadResellerProducts } from '../../../../redux/resellerProducts/thunk';
import styles from './EmptyContainer.style';

const EmptyContainer: FC = () => {
  // redux
  const dispatch = useDispatch();

  const resetFilters = () => {
    dispatch(reloadResllerProduct());
    dispatch(loadResellerProducts());
  };

  return (
    <View style={styles.container}>
      <EmptyProductIcon style={styles.iconMargin} />
      <PressableText title="reset filters" onPress={resetFilters} />
    </View>
  );
};

export default EmptyContainer;
