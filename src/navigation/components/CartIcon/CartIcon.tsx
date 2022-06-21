import React, { FC } from 'react';
import { Text, View } from 'react-native';

import ShoppingCart from '../../../assets/svgs/bottomNavIcons/ShoppingCart.svg';
import { useAppSelector } from '../../../redux/store';
import colors from '../../../utils/theme/colors/colors';
import styles from './CartIcon.style';

type Props = {
  isFocused: boolean;
};

const CartIcon: FC<Props> = ({ isFocused }) => {
  // redux
  const cartSize = useAppSelector(
    state =>
      state.orders.orders?.filter(order => order.state === 'cart').length,
  );

  return (
    <View style={styles.container}>
      {cartSize ? (
        <View style={styles.cartIndicator}>
          <Text style={styles.indicatorText}>{cartSize}</Text>
        </View>
      ) : null}
      <ShoppingCart fill={isFocused ? colors.navBlack : colors.navGray} />
    </View>
  );
};

export default CartIcon;
