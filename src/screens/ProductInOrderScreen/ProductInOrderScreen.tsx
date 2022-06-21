import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { FC, useMemo } from 'react';
import { ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { OrdresParamList } from '../../navigation/OrdersNavigation/OrdersNavigation';
import BackArrowIcon from '../../assets/svgs/general/BackArrowIcon.svg';
import gradient from '../../utils/theme/gradient';
import useScale from '../../hooks/useScale';
import styles from './ProductInOrderScreen.style';
import PriceIcon from '../../assets/svgs/productsIcons/PriceIcon.svg';
import ShippingIcon from '../../assets/svgs/productsIcons/ShippingIcon.svg';
import StockIcon from '../../assets/svgs/productsIcons/StockIcon.svg';
import BigButton from '../../components/buttons/BigButton/BigButton';
import { StackNavigationProp } from '@react-navigation/stack';

type RouteConfig = RouteProp<OrdresParamList, 'ProductInOrderScreen'>;
type NavigationProp = StackNavigationProp<
  OrdresParamList,
  'ProductInOrderScreen'
>;

const ProductInOrderScreen: FC = () => {
  // navigation
  const { item, isComplete } = useRoute<RouteConfig>().params;
  const navigation = useNavigation<NavigationProp>();

  // styles
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  return (
    <View style={stylesWithProps.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={stylesWithProps.scrollView}>
        <ImageBackground
          resizeMode="contain"
          style={stylesWithProps.imageContainer}
          source={{ uri: item.variant?.image?.product_url }}>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={stylesWithProps.imageItem}>
            <BackArrowIcon />
          </TouchableOpacity>
          <LinearGradient style={stylesWithProps.imageItem} colors={gradient}>
            <Text style={stylesWithProps.title}>{item.variant?.name}</Text>
          </LinearGradient>
        </ImageBackground>
        <View style={stylesWithProps.mainContent}>
          <Text style={stylesWithProps.marginText}>Your margin $27</Text>
          <View style={stylesWithProps.infoContainer}>
            <View style={stylesWithProps.infoTopContainer}>
              <View style={stylesWithProps.infoTopItem}>
                <PriceIcon style={stylesWithProps.iconMargin} />
                <Text style={stylesWithProps.infoItemText}>{item.price}</Text>
              </View>
              <View style={stylesWithProps.infoTopItem}>
                <StockIcon style={stylesWithProps.iconMargin} />
                <Text style={stylesWithProps.infoItemText}>In stock</Text>
                {/* need check with Seva and Tami */}
              </View>
            </View>
            <View style={stylesWithProps.infoBottomItem}>
              <ShippingIcon style={stylesWithProps.iconMargin} />
              <Text style={stylesWithProps.infoItemText}>{item.currency}</Text>
            </View>
          </View>
          <Text style={stylesWithProps.descriptionText}>
            {item.variant?.short_description}
          </Text>
        </View>
      </ScrollView>
      {!isComplete && (
        <View style={stylesWithProps.bottomContainer}>
          <BigButton
            type="red"
            title="X Remove from this order"
            onPress={() => null}
          />
        </View>
      )}
    </View>
  );
};

export default ProductInOrderScreen;
